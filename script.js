const apiKey = "33981973ac85ba1e8f758509639feddf";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const weatherIconContainer = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `🌡️ ${data.main.temp}°C`;
            weatherCondition.textContent = data.weather[0].description;

            // Show the weather info with animation
            weatherInfo.classList.remove("hidden");
            gsap.from("#weatherInfo", { opacity: 0, scale: 0.8, duration: 0.5 });

            // Change background dynamically
            changeBackground(data.weather[0].main);

            // Load Lottie Animation
            loadWeatherAnimation(data.weather[0].main);
        } else {
            alert("City not found!");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// Function to Change Background Based on Weather
function changeBackground(weather) {
    const backgrounds = {
        "Clear": "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        "Clouds": "linear-gradient(135deg, #667eea, #764ba2)",
        "Rain": "linear-gradient(135deg, #3a7bd5, #3a6073)",
        "Snow": "linear-gradient(135deg, #e6e9f0, #eef1f5)"
    };
    document.body.style.background = backgrounds[weather] || backgrounds["Clear"];
}

// Function to Load Animated Weather Icons
function loadWeatherAnimation(weather) {
    let animationData = {
        "Clear": "https://assets2.lottiefiles.com/packages/lf20_jD7uM5.json",
        "Clouds": "https://assets8.lottiefiles.com/packages/lf20_HV1Dh7.json",
        "Rain": "https://assets2.lottiefiles.com/packages/lf20_rp0j2h6j.json",
        "Snow": "https://assets2.lottiefiles.com/packages/lf20_XQOaLU.json"
    };
    weatherIconContainer.innerHTML = ""; // Clear previous animation
    let anim = lottie.loadAnimation({
        container: weatherIconContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationData[weather] || animationData["Clear"]
    });
}

// GSAP Animations on Load
gsap.from(".container", { opacity: 0, y: -50, duration: 1, ease: "power2.out" });
