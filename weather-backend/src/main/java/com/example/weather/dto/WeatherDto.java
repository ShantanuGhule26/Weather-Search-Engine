package com.example.weather.dto;

import lombok.Data;

@Data
public class WeatherDto {

    private String city;
    private String country;
    private String description;
    private double temperature;
    private double feelsLike;
    private double tempMin;
    private double tempMax;
    private int humidity;
    private double windSpeed;
    private int pressure;
    private int visibility;
    private long sunrise;
    private long sunset;
    private String iconUrl;
}
