let inp = document.getElementById("in");
let btn = document.getElementById("btn");

inp.addEventListener("keydown",async (e) => {
    if (e.key === "Enter") {
    let city = inp.value;
    inp.value=""
    await fetchWeatherData(city);}
});
btn.addEventListener("click", async (e) => {
    let city = inp.value;
    inp.value=""
    await fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ad010f6413abec4fc52fa28e71bccdf`);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
       
        let data = await response.json();
        
        if (data.weather && data.weather.length > 0) {
            let iconCode = data.weather[0].icon; 
            let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; 

            document.getElementById('weather-icon').src = iconUrl; 
            let cityElements = document.getElementsByClassName("city");
            if (cityElements.length > 0) {
                cityElements[0].innerHTML = data.name; // Access the first element
            }


            let temp = document.getElementsByClassName("temp");
            let tempKelvin = data.main.temp; // Temperature in Kelvin
            let tempCelsius = (tempKelvin - 273.15).toFixed(0);
            if (temp.length > 0) {
                temp[0].innerHTML = `${tempCelsius}°C`; // Set the temperature in Celsius
            }

            let w = document.getElementsByClassName("wind");
            let speed=data.wind.speed
            w[0].innerHTML=`${speed} Km`

            let h = document.getElementsByClassName("humidity");
            let humid=data.main.humidity
            h[0].innerHTML=`${humid} %`
            

        }
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}
