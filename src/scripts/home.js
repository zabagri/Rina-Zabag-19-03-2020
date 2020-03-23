import weatherApi from '../../api/weatherApi.js'
import config from '../../api/config.js'
import stateModule from '../../stateManager.js'
import Store from '../../store.js'

function readyHome() {
  var state = stateModule.getState();
  if(state === undefined) {
    stateModule.changeState({ key: config.defaultCityKey, name: "Tel Aviv"});
    state = stateModule.getState();
  }

  if(Store.Get(state.key) !== null) {
    document.getElementsByClassName("fa-heart")[0].style.color = "red";
    document.getElementsByClassName("favorite-button")[0].style.display = "none";
    document.getElementsByClassName("remove-favorite-button")[0].style.display = "block";
  }

  weatherApi.getCurrentWeather(state.key, (data) => {
        var currentWeather = data;
        document.getElementsByClassName("temperature-city")[0].innerHTML = state.name;
        document.getElementsByClassName("temperature-value")[0].innerHTML = Math.round(currentWeather.temperature) + "° C";
        document.getElementsByClassName("forecast-img")[0].src = "https://www.accuweather.com/images/weathericons/" + currentWeather.icon +".svg";
    });
        
    weatherApi.getFiveDayForecast(state.key, (data) => {
        var dailyForecasts = data.forecasts;
        var i = 0;
        for (i = 0; i < 5; i++) {
            document.getElementsByClassName("weekly-img")[i].src = "https://www.accuweather.com/images/weathericons/" + dailyForecasts[i].Day.Icon +".svg";
            document.getElementsByClassName("week-day")[i].innerHTML = getWeekDay(new Date(dailyForecasts[i].Date).getDay());
            document.getElementsByClassName("weekly-temperature")[i].innerHTML = Math.round(dailyForecasts[i].Temperature.Maximum.Value) + "° C / " + Math.round(dailyForecasts[i].Temperature.Minimum.Value) + "° C";
        }
    });
    
    document.getElementsByClassName("search-box")[0].onkeyup = function () {
      var ul = document.getElementsByClassName("city-list")[0];
      ul.innerHTML = "";
      var searchText = document.getElementsByClassName("search-box")[0].value
      weatherApi.getAutoComplete(searchText, (data) => {
          var cityList = data.cityList;
          var i = 0;
          for (var i = 0; i < cityList.length; i++) {
              var city = cityList[i].LocalizedName + " - " + cityList[i].Country.LocalizedName;
              var li = document.createElement('li');
              li.id = cityList[i].Key;
              li.innerHTML = city;
              ul.appendChild(li);
              (function(cityKey, cityName){
                  li.addEventListener("click", function() {
                    stateModule.changeState({ key: cityKey, name: cityName });
                    state = stateModule.getState();
                    if(Store.Get(state.key) !== null) {
                      document.getElementsByClassName("fa-heart")[0].style.color = "red";
                      document.getElementsByClassName("favorite-button")[0].style.display = "none";
                      document.getElementsByClassName("remove-favorite-button")[0].style.display = "block";
                    }
                    else {
                      document.getElementsByClassName("fa-heart")[0].style.color = "gray";
                      document.getElementsByClassName("favorite-button")[0].style.display = "block";
                      document.getElementsByClassName("remove-favorite-button")[0].style.display = "none";
                    }
                      document.getElementsByClassName("temperature-city")[0].innerHTML = cityName;
                      weatherApi.getCurrentWeather(cityKey, (data) => {
                          var currentWeather = data;
                          document.getElementsByClassName("temperature-value")[0].innerHTML = Math.round(currentWeather.temperature) + "° C";
                          document.getElementsByClassName("forecast-img")[0].src = "https://www.accuweather.com/images/weathericons/" + currentWeather.icon +".svg";
                      });
                      weatherApi.getFiveDayForecast(cityKey, (data) => {
                          var dailyForecasts = data.forecasts;
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
    document.getElementsByClassName("favorite-button")[0].addEventListener("click", function() {
      var state = stateModule.getState();
      Store.Save(state.key, state.name);
      document.getElementsByClassName("fa-heart")[0].style.color = "red";
      document.getElementsByClassName("favorite-button")[0].style.display = "none";
      document.getElementsByClassName("remove-favorite-button")[0].style.display = "block";
    });

    document.getElementsByClassName("remove-favorite-button")[0].addEventListener("click", function() {
      var state = stateModule.getState();
      Store.Remove(state.key);
      document.getElementsByClassName("fa-heart")[0].style.color = "gray";
      document.getElementsByClassName("favorite-button")[0].style.display = "block";
      document.getElementsByClassName("remove-favorite-button")[0].style.display = "none";
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
export default readyHome;