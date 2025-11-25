package com.example.weather.controller;

import com.example.weather.dto.WeatherDto;
import com.example.weather.service.WeatherService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public WeatherDto getWeather(@RequestParam("city") @NotBlank(message = "City name is required") String city) {
        return weatherService.getWeatherByCity(city.trim());
    }
}
