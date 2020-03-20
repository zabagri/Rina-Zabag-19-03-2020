import getAsync from '../api/api.js'
import config from '../api/config.js'

function ready() {
    var url = config.getCurrentWeatherUrl.basePath + "215854" + "?" + config.apiKey;
    getAsync(url, (data) => {
        console.log(data);
    });  
}

  document.addEventListener("DOMContentLoaded", ready);