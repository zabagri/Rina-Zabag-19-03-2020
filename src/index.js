import routes from '../routes.js'
import readyHome from './scripts/home.js'
import readyFavorites from './scripts/favorites.js'

var contentDiv = document.getElementsByClassName('sub-page-container')[0];
function ready() {
    contentDiv.innerHTML = routes['/#home'];
    document.getElementById("home").classList.add("active");
    readyHome();
}

document.addEventListener("DOMContentLoaded", ready);

function onNavItemClick (pathName) {
    contentDiv.innerHTML = routes[pathName];
}

document.getElementById("home").onclick = function () {
  onNavItemClick('/#home');
    document.getElementById("home").classList.add("active");
    document.getElementById("favorites").classList.remove("active");
    readyHome();
}

document.getElementById("favorites").onclick = function () {
    onNavItemClick('/#favorites');
    document.getElementById("home").classList.remove("active");
    document.getElementById("favorites").classList.add("active");
    readyFavorites();
}
