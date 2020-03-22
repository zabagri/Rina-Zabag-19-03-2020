const config = {
    apiKey: "7UTfGvM5vbMWwWWqxmO604F3SrKDniJX",
    defaultCityKey: "215854",
    autoCompleteUrl: {
        basePath: "http://dataservice.accuweather.com/locations/v1/cities/autocomplete"
    },
    getCurrentWeatherUrl: {
        basePath: "http://dataservice.accuweather.com/currentconditions/v1/"
    },
    fiveDayForecastUrl: {
        basePath: "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
    }
}

export default config