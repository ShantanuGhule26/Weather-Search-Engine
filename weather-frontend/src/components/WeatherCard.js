import React from 'react';

const formatTemp = (n) => (n != null ? `${n.toFixed(1)}°C` : '-');

const formatTime = (epochSeconds) => {
  if (!epochSeconds) return '-';
  const d = new Date(epochSeconds * 1000);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function WeatherCard({ data }) {

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <section className="weather-card">
      <div className="weather-card-header">
        <div>
          <h2 className="location">
         
            {data.city}, {data.country}   <span className="date">{today}</span>
          </h2>
          <p className="description">{data.description}</p>
        </div>

        {data.iconUrl && (
          <img
            src={data.iconUrl}
            alt={data.description}
            className="weather-icon"
          />
        )}
      </div>

      <div className="weather-grid">
        <div className="weather-main-temp">
          <div className="label">Current</div>
          <div className="value big">{formatTemp(data.temperature)}</div>
          <div className="muted">Feels like {formatTemp(data.feelsLike)}</div>
        </div>

        <div className="weather-row">
          <span>Min / Max</span>
          <span>
            {formatTemp(data.tempMin)} / {formatTemp(data.tempMax)}
          </span>
        </div>

        <div className="weather-row">
          <span>Humidity</span>
          <span>{data.humidity}%</span>
        </div>

        <div className="weather-row">
          <span>Wind Speed</span>
          <span>{data.windSpeed} m/s</span>
        </div>

        <div className="weather-row">
          <span>Pressure</span>
          <span>{data.pressure} hPa</span>
        </div>

        <div className="weather-row">
          <span>Visibility</span>
          <span>{data.visibility} m</span>
        </div>

        <div className="weather-row">
          <span>Sunrise</span>
          <span>{formatTime(data.sunrise)}</span>
        </div>

        <div className="weather-row">
          <span>Sunset</span>
          <span>{formatTime(data.sunset)}</span>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;
