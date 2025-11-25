package com.example.weather.service;

import com.example.weather.dto.OpenWeatherResponse;
import com.example.weather.dto.WeatherDto;
import com.example.weather.exception.CityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;
    private final String apiKey;

    public WeatherService(@Value("${openweather.api.key}") String apiKey) {
        this.restTemplate = new RestTemplate();
        this.apiKey = apiKey;
    }

    @Cacheable(cacheNames = "weatherByCity", key = "#city.toLowerCase()")
    public WeatherDto getWeatherByCity(String city) {
        try {
            String url = String.format(
                    "https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric",
                    city, apiKey);

            ResponseEntity<OpenWeatherResponse> response =
                    restTemplate.getForEntity(url, OpenWeatherResponse.class);

            OpenWeatherResponse body = response.getBody();
            if (body == null || body.getMain() == null) {
                throw new CityNotFoundException("No weather data found for city: " + city);
            }
            return mapToDto(body);
        } catch (HttpClientErrorException.NotFound e) {
            throw new CityNotFoundException("City not found: " + city);
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("Error calling OpenWeather API: " + e.getStatusCode());
        }
    }

    private WeatherDto mapToDto(OpenWeatherResponse res) {
        WeatherDto dto = new WeatherDto();

        dto.setCity(res.getName());
        dto.setCountry(res.getSys() != null ? res.getSys().getCountry() : "");

        String description = "";
        String icon = null;
        if (res.getWeather() != null && !res.getWeather().isEmpty()) {
            description = res.getWeather().get(0).getDescription();
            icon = res.getWeather().get(0).getIcon();
        }
        dto.setDescription(capitalize(description));

        if (icon != null) {
            dto.setIconUrl("https://openweathermap.org/img/wn/" + icon + "@2x.png");
        }

        OpenWeatherResponse.Main main = res.getMain();
        dto.setTemperature(main.getTemp());
        dto.setFeelsLike(main.getFeels_like());
        dto.setTempMin(main.getTemp_min());
        dto.setTempMax(main.getTemp_max());
        dto.setHumidity(main.getHumidity());
        dto.setPressure(main.getPressure());

        if (res.getWind() != null) {
            dto.setWindSpeed(res.getWind().getSpeed());
        }

        dto.setVisibility(res.getVisibility() != null ? res.getVisibility() : 0);

        if (res.getSys() != null) {
            dto.setSunrise(res.getSys().getSunrise());
            dto.setSunset(res.getSys().getSunset());
        }

        return dto;
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }
}
