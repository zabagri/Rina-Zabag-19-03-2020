import Store from '../../store.js'
import stateModule from '../../stateManager.js'
import readyHome from '../../src/scripts/home.js'
import routes from '../../routes.js'
import weatherApi from '../../api/weatherApi.js'

function readyFavorites() {
    var favorites = Store.GetAll();

    for(var i = 0; i < favorites.length; i++) {
        (function(cityKey, cityName){
            weatherApi.getCurrentWeather(cityKey, (data) => {
                var currentWeather = data;
                var favoriteDiv = document.createElement('div');
                favoriteDiv.classList.add('favorite-card');
                var img = document.createElement('img');
                img.src = "https://www.accuweather.com/images/weathericons/" + currentWeather.icon +".svg";
                img.classList.add('favorite-img');
                favoriteDiv.appendChild(img);
                var container = document.createElement('div');
                container.classList.add('container');
                var city = document.createElement('h4');
                city.innerHTML = cityName;
                city.classList.add('city');
                container.appendChild(city);
                var temperature = document.createElement('p');
                temperature.innerHTML = Math.round(currentWeather.temperature) + "° C"
                temperature.classList.add('temperature');
                container.appendChild(temperature);
                var verbalTemperature = document.createElement('p');
                verbalTemperature.innerHTML = currentWeather.verbalWeather;
                verbalTemperature.classList.add('verbal-temperature');
                container.appendChild(verbalTemperature);
                favoriteDiv.appendChild(container);
                
                favoriteDiv.addEventListener("click", () => {
                    stateModule.changeState({key: cityKey, name: cityName});
                    var contentDiv = document.getElementsByClassName('sub-page-container')[0];
                    window.history.pushState(
                        {},
                        '/',
                        window.location.origin + '/'
                      );
                    contentDiv.innerHTML = routes['/'];
                    document.getElementById("home").classList.add("active");
                    document.getElementById("favorites").classList.remove("active");
                    readyHome();
                })
                document.getElementsByClassName('favorites')[0].appendChild(favoriteDiv);
            });
        ;})(favorites[i].key, favorites[i].name);
    }
}

export default readyFavorites;