// Weather App JavaScript
// Created by Hafizh Vito Pratomo
// GitHub: https://github.com/Hafizhvito
// Email: hafizhvito2@gmail.com

class WeatherApp {
  constructor() {
    this.API_KEY = "..."; // Ganti dengan API key Anda
    this.BASE_URL = "https://api.openweathermap.org/data/2.5";
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCurrentDate();
    this.loadDefaultWeather();
  }

  bindEvents() {
    const searchBtn = document.getElementById("searchBtn");
    const cityInput = document.getElementById("cityInput");
    const locationBtn = document.getElementById("locationBtn");

    searchBtn.addEventListener("click", () => this.searchWeather());
    cityInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.searchWeather();
      }
    });
    locationBtn.addEventListener("click", () =>
      this.getCurrentLocationWeather()
    );
  }

  async searchWeather() {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();

    if (!city) {
      this.showError("Silakan masukkan nama kota");
      return;
    }

    this.showLoading();

    try {
      const weatherData = await this.fetchWeatherByCity(city);
      const forecastData = await this.fetchForecastByCity(city);

      this.displayWeather(weatherData, forecastData);
      cityInput.value = "";
    } catch (error) {
      this.showError("Kota tidak ditemukan. Silakan coba lagi.");
      console.error("Error fetching weather:", error);
    }
  }

  async getCurrentLocationWeather() {
    if (!navigator.geolocation) {
      this.showError("Geolocation tidak didukung oleh browser ini");
      return;
    }

    this.showLoading();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await this.fetchWeatherByCoords(
            latitude,
            longitude
          );
          const forecastData = await this.fetchForecastByCoords(
            latitude,
            longitude
          );

          this.displayWeather(weatherData, forecastData);
        } catch (error) {
          this.showError("Gagal mengambil data cuaca untuk lokasi Anda");
          console.error("Error fetching weather:", error);
        }
      },
      (error) => {
        this.showError("Gagal mengakses lokasi Anda");
        console.error("Geolocation error:", error);
      }
    );
  }

  async fetchWeatherByCity(city) {
    const response = await fetch(
      `${this.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${
        this.API_KEY
      }&units=metric&lang=id`
    );

    if (!response.ok) {
      throw new Error("Weather data not found");
    }

    return await response.json();
  }

  async fetchForecastByCity(city) {
    const response = await fetch(
      `${this.BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${
        this.API_KEY
      }&units=metric&lang=id`
    );

    if (!response.ok) {
      throw new Error("Forecast data not found");
    }

    return await response.json();
  }

  async fetchWeatherByCoords(lat, lon) {
    const response = await fetch(
      `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&lang=id`
    );

    if (!response.ok) {
      throw new Error("Weather data not found");
    }

    return await response.json();
  }

  async fetchForecastByCoords(lat, lon) {
    const response = await fetch(
      `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&lang=id`
    );

    if (!response.ok) {
      throw new Error("Forecast data not found");
    }

    return await response.json();
  }

  displayWeather(weatherData, forecastData) {
    this.hideLoading();
    this.hideError();

    // Update current weather
    document.getElementById("cityName").textContent = weatherData.name;
    document.getElementById("temperature").textContent = `${Math.round(
      weatherData.main.temp
    )}°`;
    document.getElementById("description").textContent =
      weatherData.weather[0].description;
    document.getElementById(
      "humidity"
    ).textContent = `${weatherData.main.humidity}%`;
    document.getElementById("windSpeed").textContent = `${Math.round(
      weatherData.wind.speed * 3.6
    )} km/h`;
    document.getElementById("feelsLike").textContent = `${Math.round(
      weatherData.main.feels_like
    )}°`;
    document.getElementById("visibility").textContent = `${(
      weatherData.visibility / 1000
    ).toFixed(1)} km`;

    // Update weather icon
    const weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.className = this.getWeatherIcon(
      weatherData.weather[0].main,
      weatherData.weather[0].icon
    );

    // Update forecast
    this.displayForecast(forecastData);

    // Show weather content
    document.getElementById("weatherContent").classList.add("show");
  }

  displayForecast(forecastData) {
    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = "";

    // Get daily forecasts (one per day for next 5 days)
    const dailyForecasts = this.processForecastData(forecastData);

    dailyForecasts.forEach((forecast) => {
      const forecastElement = document.createElement("div");
      forecastElement.className = "forecast-item";

      forecastElement.innerHTML = `
                <div class="forecast-day">${forecast.day}</div>
                <div class="forecast-icon">
                    <i class="${forecast.icon}"></i>
                </div>
                <div class="forecast-temps">
                    <span class="forecast-high">${forecast.maxTemp}°</span>
                    <span class="forecast-low">${forecast.minTemp}°</span>
                </div>
                <div class="forecast-desc">${forecast.description}</div>
            `;

      forecastContainer.appendChild(forecastElement);
    });
  }

  processForecastData(forecastData) {
    const dailyData = {};
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          day: days[date.getDay()],
          temps: [],
          weather: item.weather[0],
          icon: this.getWeatherIcon(item.weather[0].main, item.weather[0].icon),
        };
      }

      dailyData[dateKey].temps.push(item.main.temp);
    });

    const processedData = Object.values(dailyData)
      .slice(1, 6)
      .map((day) => ({
        day: day.day,
        maxTemp: Math.round(Math.max(...day.temps)),
        minTemp: Math.round(Math.min(...day.temps)),
        description: day.weather.description,
        icon: day.icon,
      }));

    return processedData;
  }

  getWeatherIcon(weatherMain, iconCode) {
    const iconMap = {
      Clear: "fas fa-sun",
      Clouds: "fas fa-cloud",
      Rain: "fas fa-cloud-rain",
      Drizzle: "fas fa-cloud-drizzle",
      Thunderstorm: "fas fa-cloud-bolt",
      Snow: "fas fa-snowflake",
      Mist: "fas fa-smog",
      Smoke: "fas fa-smog",
      Haze: "fas fa-smog",
      Dust: "fas fa-smog",
      Fog: "fas fa-smog",
      Sand: "fas fa-smog",
      Ash: "fas fa-smog",
      Squall: "fas fa-wind",
      Tornado: "fas fa-tornado",
    };

    // Check if it's night time based on icon code
    if (iconCode && iconCode.includes("n")) {
      if (weatherMain === "Clear") return "fas fa-moon";
      if (weatherMain === "Clouds") return "fas fa-cloud-moon";
    }

    return iconMap[weatherMain] || "fas fa-sun";
  }

  showLoading() {
    document.getElementById("loading").classList.add("show");
    document.getElementById("weatherContent").classList.remove("show");
    this.hideError();
  }

  hideLoading() {
    document.getElementById("loading").classList.remove("show");
  }

  showError(message) {
    const errorElement = document.getElementById("errorMessage");
    errorElement.querySelector("p").textContent = message;
    errorElement.classList.add("show");
    this.hideLoading();
    document.getElementById("weatherContent").classList.remove("show");
  }

  hideError() {
    document.getElementById("errorMessage").classList.remove("show");
  }

  updateCurrentDate() {
    const now = new Date();
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const dateString = `${dayName}, ${day} ${month} ${year}`;
    document.getElementById("currentDate").textContent = dateString;
  }

  async loadDefaultWeather() {
    // Load default weather for user's location (Bekasi, West Java)
    try {
      this.showLoading();
      const weatherData = await this.fetchWeatherByCity("Bekasi");
      const forecastData = await this.fetchForecastByCity("Bekasi");
      this.displayWeather(weatherData, forecastData);
    } catch (error) {
      // If Bekasi fails, try Jakarta as fallback
      try {
        const weatherData = await this.fetchWeatherByCity("Jakarta");
        const forecastData = await this.fetchForecastByCity("Jakarta");
        this.displayWeather(weatherData, forecastData);
      } catch (fallbackError) {
        this.hideLoading();
        console.error("Failed to load default weather:", fallbackError);
      }
    }
  }
}

// Demo mode - untuk testing tanpa API key
class DemoWeatherApp extends WeatherApp {
  constructor() {
    super();
    this.demoMode = true;
  }

  async fetchWeatherByCity(city) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      name: city,
      main: {
        temp: 28 + Math.random() * 10,
        feels_like: 32 + Math.random() * 8,
        humidity: 60 + Math.random() * 30,
      },
      weather: [
        {
          main: "Clear",
          description: "cerah",
          icon: "01d",
        },
      ],
      wind: {
        speed: 2 + Math.random() * 5,
      },
      visibility: 10000,
    };
  }

  async fetchForecastByCity(city) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const forecastList = [];
    const weatherTypes = ["Clear", "Clouds", "Rain", "Drizzle"];

    // Generate 5 days of forecast data
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      // Generate 8 entries per day (3-hour intervals)
      for (let j = 0; j < 8; j++) {
        const weatherType =
          weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        forecastList.push({
          dt: Math.floor(date.getTime() / 1000) + j * 3 * 3600,
          main: {
            temp: 25 + Math.random() * 8,
            temp_min: 22 + Math.random() * 5,
            temp_max: 30 + Math.random() * 5,
          },
          weather: [
            {
              main: weatherType,
              description: this.getWeatherDescription(weatherType),
              icon: this.getDemoIcon(weatherType),
            },
          ],
        });
      }
    }

    return { list: forecastList };
  }

  async fetchWeatherByCoords(lat, lon) {
    return this.fetchWeatherByCity("Lokasi Anda");
  }

  async fetchForecastByCoords(lat, lon) {
    return this.fetchForecastByCity("Lokasi Anda");
  }

  getDemoIcon(weatherType) {
    const iconMap = {
      Clear: "01d",
      Clouds: "03d",
      Rain: "10d",
      Drizzle: "09d",
    };
    return iconMap[weatherType] || "01d";
  }

  getWeatherDescription(weatherType) {
    const descriptions = {
      Clear: "cerah",
      Clouds: "berawan",
      Rain: "hujan",
      Drizzle: "gerimis",
    };
    return descriptions[weatherType] || "cerah";
  }
}

// API Configuration Instructions
function showAPIInstructions() {
  console.log(`
    🌤️  WEATHER APP - SETUP INSTRUCTIONS
    =====================================
    
    Untuk menggunakan aplikasi ini dengan data cuaca real:
    
    1. Daftar di OpenWeatherMap: https://openweathermap.org/api
    2. Dapatkan API key gratis Anda
    3. Ganti 'YOUR_OPENWEATHERMAP_API_KEY' di script.js dengan API key Anda
    4. Upload semua file (index.html, style.css, script.js) ke repository GitHub Anda
    
    Struktur file:
    📁 weather-app/
    ├── 📄 index.html
    ├── 📄 style.css
    ├── 📄 script.js
    └── 📄 README.md
    
    Saat ini aplikasi berjalan dalam mode demo dengan data simulasi.
    
    Created by: Hafizh Vito Pratomo
    GitHub: https://github.com/Hafizhvito
    Email: hafizhvito2@gmail.com
    `);
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  // Check if API key is configured
  const hasAPIKey = "YOUR_OPENWEATHERMAP_API_KEY".length > 25;

  if (hasAPIKey) {
    // Use real API
    new WeatherApp();
    console.log("✅ Weather App initialized with real API");
  } else {
    // Use demo mode
    new DemoWeatherApp();
    console.log("🧪 Weather App running in DEMO MODE");
    showAPIInstructions();
  }

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = "smooth";

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.getElementById("cityInput").blur();
    }
  });

  // Add touch support for mobile
  let touchStartY = 0;
  document.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    // Pull to refresh functionality (swipe down)
    if (diff < -100 && window.scrollY === 0) {
      const weatherContent = document.getElementById("weatherContent");
      if (weatherContent.classList.contains("show")) {
        location.reload();
      }
    }
  });
});

// Service Worker for offline functionality (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // You can add service worker registration here for offline support
    console.log("💡 Tip: Add service worker for offline functionality");
  });
}

// Export for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WeatherApp, DemoWeatherApp };
}
