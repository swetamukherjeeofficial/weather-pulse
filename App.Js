const startBtn = document.querySelector(".start");
const search = document.querySelector("#inputfield");
const searchIcon = document.querySelector("#searchIcon");
const desc = document.querySelector("#desc");
const temp = document.querySelector("#temp");
const cityName = document.querySelector("#city");
const wind = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidityper");
const goHome = document.querySelector(".homeBtn");
const icon = document.querySelector("#icon");
const mainBox1 = document.querySelector(".mainBox1");
const mainBox2 = document.querySelector(".mainBox2");
const mainBox3 = document.querySelector(".mainBox3");

startBtn.addEventListener("click", () => {
    mainBox1.classList.add("inactive");
    mainBox2.classList.remove("inactive");
});

const url = "https://api.weatherapi.com/v1/current.json?";
const apiKey = "1fd86537adf64841ac5153553261411";

async function getWeatherData(city) {
    if (!city.trim()) return;
    let finalUrl = `${url}key=${apiKey}&q=${city}`;
    let weatherData = await fetch(finalUrl).then(res => res.json());
    console.log(weatherData);

    if (weatherData.error) {
        mainBox2.classList.add("inactive");
        mainBox3.classList.remove("inactive");
        desc.innerHTML = "Description";
        temp.innerHTML = "0°c";
        cityName.innerHTML = "City Name";
        wind.innerHTML = "0km/h";
        humidity.innerHTML = "0%";
        search.value="";
        icon.src = "Images/clear.png";
        return;
    }

    desc.innerHTML = weatherData.current.condition.text;
    temp.innerHTML = Math.round(weatherData.current.temp_c) + "°c";
    cityName.innerHTML = weatherData.location.name;
    wind.innerHTML = weatherData.current.wind_kph + "km/h";
    humidity.innerHTML = weatherData.current.humidity + "%";
    icon.src = "https:" + weatherData.current.condition.icon;
}

searchIcon.addEventListener("click", () => {
    getWeatherData(search.value);
});

search.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeatherData(search.value);
    }
});

goHome.addEventListener("click", () => {
    mainBox3.classList.add("inactive");
    mainBox1.classList.remove("inactive");
});
