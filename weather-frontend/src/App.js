import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';

const BACKEND_BASE_URL = 'http://localhost:8080/api/weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (submittedCity) => {
    const trimmed = submittedCity.trim();
    if (!trimmed) return;

    setCity(trimmed);
    setWeather(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_BASE_URL}?city=${encodeURIComponent(trimmed)}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Something went wrong');
      }
      const data = await res.json();
      setWeather(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <div className="app-container">
        <header className="app-header">
          <div className="app-icon">☀️</div>
          <div>
            <h1 className="app-title">Weather Forecast</h1>
            <p className="app-subtitle">Search any city to view current conditions</p>
          </div>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} />}

        {weather && !loading && !error && <WeatherCard data={weather} />}
      </div>
    </div>
  );
}

export default App;
