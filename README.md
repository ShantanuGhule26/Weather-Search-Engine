# Weather Search Engine

A simple weather search application built with **Spring Boot** and **React.js**.  
Users can search any city and view current weather details in a clean, responsive UI.

---
## Tech Stack

**Backend**
- Spring Boot  
- REST API  
- Caffeine Cache  
- Lombok  
- OpenWeather API  

**Frontend**
- React.js  
- HTML, CSS, JavaScript  
- Fetch API
---

## Features
- Search weather by city name  
- Displays temperature, humidity, pressure, wind, visibility, sunrise, sunset, etc.  
- Caching boosts performance for repeated requests  
- Clean and modern UI  
- Errors handled gracefully  

---

##  Setup Instructions

### **1. Backend**
```bash
cd weather-backend
mvn clean install
mvn spring-boot:run
```
---

### **2. Frontend**
```bash
cd weather-frontend
npm install
npm start
```

---

Add your API key in `application.properties`:
```
openweather.api.key=YOUR_API_KEY
```








