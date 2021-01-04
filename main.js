const api = {
  key: "", //I've removed my API key
  baseurl: "https://api.openweathermap.org/data/2.5/",
  //api.openweathermap.org/data/2.5/weather?id=524901&appid=YOUR_API_KEY
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    //'13' is the return key
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
    //weather?id=524901&appid=YOUR_API_KEY
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.InnerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hilow");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
}

function dateBuilder(d) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tues", "Wed", "thurs", "Fri", "Sat"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  let fullDate = `${day} ${date} ${month} ${year}`;
  let getDate = document.querySelector(".date");
  getDate.innerHTML = fullDate;
  console.log("fullDate: " + fullDate);
}
