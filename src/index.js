import routes from '../routes.js'
import readyHome from './scripts/home.js'
import readyFavorites from './scripts/favorites.js'

var contentDiv = document.getElementsByClassName('sub-page-container')[0];
function ready() {
    contentDiv.innerHTML = routes['/'];
    document.getElementById("home").classList.add("active");
    readyHome();
}

document.addEventListener("DOMContentLoaded", ready);

function onNavItemClick (pathName) {
    window.history.pushState(
      {},
      pathName,
      window.location.origin + "/Rina-Zabag-19-03-2020" + pathName // problem because of github pages deployment
    );
    contentDiv.innerHTML = routes[pathName];
}

window.onpopstate = () => {
    contentDiv.innerHTML = routes[window.location.pathname.replace("/Rina-Zabag-19-03-2020", "")];
}

document.getElementById("home").onclick = function () {
  onNavItemClick('/');
    document.getElementById("home").classList.add("active");
    document.getElementById("favorites").classList.remove("active");
    readyHome();
}

document.getElementById("favorites").onclick = function () {
    onNavItemClick('/favorites');
    document.getElementById("home").classList.remove("active");
    document.getElementById("favorites").classList.add("active");
    readyFavorites();
}