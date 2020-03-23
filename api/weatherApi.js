import getAsync from '../api/api.js'
import CurrentWeather from '../models/currentWeather.js'
import Autocomplete from '../models/autocomplete.js'
import FiveDaysForecast from '../models/fiveDaysForecast.js'
import config from '../api/config.js'

const weatherApi = {
    getCurrentWeather(cityKey, callback) {
        var url = config.getCurrentWeatherUrl.basePath + cityKey + "?apikey=" + config.apiKey;
        getAsync(url, (data) => {
            var currentWeather = JSON.parse(data);
            callback(new CurrentWeather(currentWeather[0].Temperature.Metric.Value,
                                          currentWeather[0].WeatherIcon,
                                            currentWeather[0].WeatherText));
        });
    },
    getFiveDayForecast(cityKey, callback) {
        var url = config.fiveDayForecastUrl.basePath + cityKey + "?apikey=" + config.apiKey + "&metric=true";
        getAsync(url, (data) => {
            var fiveDayForecast = JSON.parse(data);
            callback(new FiveDaysForecast(fiveDayForecast["DailyForecasts"]));
        });
    },
    getAutoComplete(searchText, callback) {
        var url = config.autoCompleteUrl.basePath + "?apikey=" + config.apiKey + "&q=" + searchText;
        getAsync(url, (data) => {
            var cityList = JSON.parse(data);
            callback(new Autocomplete(cityList));
        });
    }
}

export default weatherApi