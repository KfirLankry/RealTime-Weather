const searchBtn = document.querySelector("#search-btn");
var searchInput = document.querySelector("#search-field");
var apiKey = "";
var content = document.querySelector("#main");
let image = document.querySelector(".img");
let spinner = document.querySelector(".spinner");
let message = document.getElementById("message");
var countries;
var myCountry;
var zone;

// Ui ID's
var ui = {
  row1: {
    timeZone: document.getElementById("timezone"),
    city: document.getElementById("city"),
    country: document.getElementById("country"),
    description: document.getElementById("description"),
  },
  row2: {
    degreeC: document.getElementById("degreeC"),
    icon: document.getElementById("icon"),
    degreeF: document.getElementById("degreeF"),
  },
  row3: {
    sunrise: document.getElementById("sunrise"),
    sunset: document.getElementById("sunset"),
    windspeed: document.getElementById("windspeed"),
    windirection: document.getElementById("windirection"),
    clouds: document.getElementById("clouds"),
    snow: document.getElementById("snow"),
    feelslike: document.getElementById("feelslike"),
    humidity: document.getElementById("humidity"),
  },
};
spinner.style = "display: none;";
content.style = "display: none";

// Button Onclick Function
searchBtn.addEventListener("click", () => {
  if (searchInput.value == "") {
    content.style = "display: none;";
    image.style = "display:flex";
    message.innerHTML = `<div class="alert alert-danger" role="alert">City is required!</div>`;
  } else {
    setTimeout(() => {
      content.style = "display: flex;";
      search();
    }, 400);
  }
});

// Search function from API source
var search = async () => {
  let inputValue = searchInput.value;
  searchInput.value = "";
  image.style = "display:none";
  content.style = "display: none;";
  spinner.style = "display: flex;";
  message.style = "display: none";
  try {
    let res = await axios.get(
      `https://api.weatherbit.io/v2.0/current?&city=${inputValue}&key=${apiKey}&include=minutely`
    );
    cityWeather = res.data.data[0];
    console.log(cityWeather);
    updateInfo(cityWeather);
  } catch (err) {
    content.style = "display: none;";
    image.style = "display:flex";
    spinner.style = "display: none;";
    console.log("Not a City");
  }
};

// Innerhtml info to the page
let updateInfo = async (cityWeather) => {
  try {
    spinner.style = "display: none";
    content.style = "display: flex;";
    await findCountry(cityWeather.country_code);
    ui.row1.city.innerHTML = cityWeather.city_name;
    ui.row1.country.innerHTML = myCountry;
    ui.row1.timeZone.innerHTML = zone;
    ui.row1.description.innerHTML = cityWeather.weather.description;
    ui.row2.degreeC.innerHTML = `${cityWeather.temp} C°`;
    ui.row2.degreeF.innerHTML =
      (cityWeather.temp * 1.8 + 32).toFixed(1) + " F°";
    ui.row2.icon.src = `https://www.weatherbit.io/static/img/icons/${cityWeather.weather.icon}.png`;
    ui.row3.sunrise.innerHTML = cityWeather.sunrise;
    ui.row3.sunset.innerHTML = cityWeather.sunset;
    ui.row3.windspeed.innerHTML = `${cityWeather.wind_spd.toFixed(2)} km/h`;
    ui.row3.windirection.innerHTML = cityWeather.wind_dir;
    ui.row3.clouds.innerHTML = `${cityWeather.clouds} %`;
    ui.row3.snow.innerHTML = cityWeather.snow;
    ui.row3.feelslike.innerHTML = `${cityWeather.app_temp} C°`;
    ui.row3.humidity.innerHTML = `${cityWeather.rh} %`;
    if (myCountry == undefined) {
      ui.row1.country.innerHTML = cityWeather.country_code;
    }
    let imgCode = cityWeather.weather.code;
    let box1 = document.querySelector(".box1");
    let box2 = document.querySelector(".box2");
    let box3 = document.querySelector(".box3");

    // Changing background images following the weather
    if (imgCode == 500 || imgCode == 502 || imgCode == 511 || imgCode <= 522) {
      // Rain
      box1.style.background =
        "url(https://cdn.pixabay.com/photo/2013/11/28/09/57/aggressive-219804_960_720.jpg)";
      box2.style.background =
        "url(https://cdn.pixabay.com/photo/2018/02/03/08/00/background-3127102_960_720.jpg)";
      box3.style.background =
        "url(https://cdn.pixabay.com/photo/2017/08/06/08/39/rain-2590345_960_720.jpg)";
    } else if (
      imgCode <= 200 ||
      imgCode <= 201 ||
      imgCode <= 202 ||
      imgCode <= 230 ||
      imgCode <= 231 ||
      imgCode <= 232 ||
      imgCode <= 233
    ) {
      // Thunder
      box1.style.background =
        "url(https://cdn.pixabay.com/photo/2017/12/26/19/30/storm-3041241_960_720.jpg)";
      box2.style.background =
        "url(https://cdn.pixabay.com/photo/2016/06/13/22/12/flash-1455285_960_720.jpg)";
      box3.style.background =
        "url(https://cdn.pixabay.com/photo/2012/12/20/10/13/thunderstorm-71366_960_720.jpg)";
    } else if (imgCode <= 600 || imgCode <= 601 || imgCode <= 602) {
      // Snow
      box1.style.background =
        "url(https://cdn.pixabay.com/photo/2016/04/20/19/47/wolves-1341881_960_720.jpg)";
      box2.style.background =
        "url(https://cdn.pixabay.com/photo/2017/02/15/11/15/wintry-2068298_960_720.jpg)";
      box3.style.background =
        "url(https://cdn.pixabay.com/photo/2017/02/14/03/03/ama-dablam-2064522_960_720.jpg)";
    } else if (imgCode <= 751) {
      // Fog
      box1.style.background =
        "url(https://cdn.pixabay.com/photo/2014/11/27/10/29/mountain-547363_960_720.jpg)";
      box2.style.background =
        "url(https://cdn.pixabay.com/photo/2016/10/15/18/30/forest-1743206_960_720.jpg)";
      box3.style.background =
        "url(https://cdn.pixabay.com/photo/2016/11/22/19/10/clouds-1850093_960_720.jpg)";
    } else if (imgCode <= 801) {
      // Sunny
      box1.style.background =
        "url(https://cdn.pixabay.com/photo/2018/02/05/23/05/death-valley-3133502_960_720.jpg)";
      box2.style.background =
        "url(https://cdn.pixabay.com/photo/2017/06/17/18/35/beach-2413081_960_720.jpg)";
      box3.style.background =
        "url(https://cdn.pixabay.com/photo/2018/04/26/10/54/mountain-3351653_960_720.jpg)";
    } else if (imgCode <= 804) {
      // Cloudy
      box1.style.background =
        "url(https://cdn.pixabay.com/photo/2017/01/06/17/28/road-1958388_960_720.jpg)";
      box2.style.background =
        "url(https://cdn.pixabay.com/photo/2013/10/13/00/08/clouds-194840_960_720.jpg)";
      box3.style.background =
        "url(https://cdn.pixabay.com/photo/2013/09/23/19/33/sunset-185411_960_720.jpg)";
    } else {
      //undefined
    }
  } catch (err) {
    console.log(err);
  }
};

// Picking full country names from json file
fetch("./json/country-codes_json.json")
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    countries = jsonData;
    // console.log(countries);
  });

var findCountry = async (countryCode) => {
  try {
    for (let country of countries) {
      if (country.Alpha_2 == countryCode || country.FIPS == countryCode) {
        myCountry = country.official_name_en;
        zone = country.region_name;
        console.log(zone);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
