import routes from '../routes.js'

  var contentDiv = document.getElementsByClassName('sub-page-container')[0];
// function ready() {
//     contentDiv.innerHTML = routes['/'];
//     document.getElementById("home").classList.add("active");
// }

// document.addEventListener("DOMContentLoaded", ready);

function onNavItemClick (pathName) {
    window.history.pushState(
      {}, 
      pathName,
      window.location.origin + pathName
    );
    contentDiv.innerHTML = routes[pathName];
}

window.onpopstate = () => {
    contentDiv.innerHTML = routes[window.location.pathname];
}

document.getElementById("home").onclick = function () {
    onNavItemClick('/');
    document.getElementById("home").classList.add("active");
    document.getElementById("favorites").classList.remove("active");
}

document.getElementById("favorites").onclick = function () {
    onNavItemClick('/favorites');
    document.getElementById("home").classList.remove("active");
    document.getElementById("favorites").classList.add("active");
}