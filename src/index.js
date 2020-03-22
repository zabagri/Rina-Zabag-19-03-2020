import getAsync from '../api/api.js'
import config from '../api/config.js'

function ready() {
    var url = config.getCurrentWeatherUrl.basePath + "215854" + "?apikey=" + config.apiKey;
    getAsync(url, (data) => {
        var currentWeather = JSON.parse(data);
        document.getElementsByClassName("temperature-value")[0].innerHTML = Math.round(currentWeather[0].Temperature.Metric.Value) + "° C";
        document.getElementsByClassName("forecast-img")[0].src = "https://www.accuweather.com/images/weathericons/" + currentWeather[0].WeatherIcon +".svg";
    });
    
    var url = config.fiveDayForecastUrl.basePath + "215854" + "?apikey=" + config.apiKey + "&metric=true";
    getAsync(url, (data) => {
        var fiveDayForecast = JSON.parse(data);
        var dailyForecasts = fiveDayForecast["DailyForecasts"];
        var i = 0;
        for (i = 0; i < 5; i++) {
            document.getElementsByClassName("weekly-img")[i].src = "https://www.accuweather.com/images/weathericons/" + dailyForecasts[i].Day.Icon +".svg";
            document.getElementsByClassName("week-day")[i].innerHTML = getWeekDay(new Date(dailyForecasts[i].Date).getDay());
            document.getElementsByClassName("weekly-temperature")[i].innerHTML = Math.round(dailyForecasts[i].Temperature.Maximum.Value) + "° C / " + Math.round(dailyForecasts[i].Temperature.Minimum.Value) + "° C";
        }
    });
}

  document.addEventListener("DOMContentLoaded", ready);

  document.getElementsByClassName("search-box")[0].onkeyup = function () {
    var ul = document.getElementsByClassName("city-list")[0];
    ul.innerHTML = "";
    var searchText = document.getElementsByClassName("search-box")[0].value
    var url = config.autoCompleteUrl.basePath + "?apikey=" + config.apiKey + "&q=" + searchText;
    getAsync(url, (data) => {
        var cityList = JSON.parse(data);
        var i = 0;
        for (var i = 0; i < cityList.length; i++) {
            var city = cityList[i].LocalizedName + " - " + cityList[i].Country.LocalizedName;
            var li = document.createElement('li');
            li.id = cityList[i].Key;
            li.innerHTML = city;
            ul.appendChild(li);
            (function(cityKey, cityName){
                li.addEventListener("click", function() {
                    document.getElementsByClassName("temperature-city")[0].innerHTML = cityName;
                    var url = config.getCurrentWeatherUrl.basePath + cityKey + "?apikey=" + config.apiKey;
                    getAsync(url, (data) => {
                        var currentWeather = JSON.parse(data);
                        document.getElementsByClassName("temperature-value")[0].innerHTML = Math.round(currentWeather[0].Temperature.Metric.Value) + "° C";
                        document.getElementsByClassName("forecast-img")[0].src = "https://www.accuweather.com/images/weathericons/" + currentWeather[0].WeatherIcon +".svg";
                    });
                    var url = config.fiveDayForecastUrl.basePath + cityKey + "?apikey=" + config.apiKey + "&metric=true";
                    getAsync(url, (data) => {
                        var fiveDayForecast = JSON.parse(data);
                        var dailyForecasts = fiveDayForecast["DailyForecasts"];
                        var i = 0;
                        for (i = 0; i < 5; i++) {
                            document.getElementsByClassName("weekly-img")[i].src = "https://www.accuweather.com/images/weathericons/" + dailyForecasts[i].Day.Icon +".svg";
                            document.getElementsByClassName("week-day")[i].innerHTML = getWeekDay(new Date(dailyForecasts[i].Date).getDay());
                            document.getElementsByClassName("weekly-temperature")[i].innerHTML = Math.round(dailyForecasts[i].Temperature.Maximum.Value) + "° C / " + Math.round(dailyForecasts[i].Temperature.Minimum.Value) + "° C";
                        }
                    });
                    document.getElementsByClassName("city-list")[0].innerHTML = "";
                    document.getElementsByClassName("search-box")[0].value = "";
            }, false);})(cityList[i].Key, cityList[i].LocalizedName);
        }
    });
  }

  function getWeekDay(day) {
    switch (day) {
        case 0:
          return "Sun";
        case 1:
          return "Mon";
        case 2:
           return "Tue";
        case 3:
          return "Wed";
        case 4:
          return "Thu";
        case 5:
          return "Fri";
        case 6:
          return "Sat";
      }
  }