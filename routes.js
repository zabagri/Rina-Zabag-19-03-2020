const routes =
    {
    '/#home': `<div class="home-page-container">
    <div class="search-container">
        <i class="fas fa-search"></i>
        <input class="search-box" placeholder="Search For Country...">
        </div>
        <div class="city-list-container">
        <ul class="city-list">
        </ul>
        </div>
        <div class="forecast-container">
        <div class="current-forecast">
            <div class="forecast">
            <img class="forecast-img" src="">
            <div class="current-teperature">
                <p class="temperature-city">Tel Aviv</p>
                <p class="temperature-value"></p>
            </div>
            </div>
            <div class="add-to-favorite">
            <i class="fas fa-heart"></i>
            <button class="favorite-button">Add To Favorites</button>
            <button class="remove-favorite-button">Remove From Favorites</button>
            </div>
        </div>
        <div class="five-day-forecast">
            <div class="forecast-card">
            <img class="weekly-img" src="" style="width:100%">
            <div class="container">
                <h4 class="week-day"><b></b></h4>
                <p class="weekly-temperature"></p>
            </div>
            </div>
            <div class="forecast-card">
            <img class="weekly-img" src="" style="width:100%">
            <div class="container">
                <h4 class="week-day"><b></b></h4>
                <p class="weekly-temperature"></p>
            </div>
            </div>
            <div class="forecast-card">
            <img class="weekly-img" src="" style="width:100%">
            <div class="container">
                <h4 class="week-day"><b></b></h4>
                <p class="weekly-temperature"></p>
            </div>
            </div>
            <div class="forecast-card">
            <img class="weekly-img" src="" style="width:100%">
            <div class="container">
                <h4 class="week-day"><b></b></h4>
                <p class="weekly-temperature"></p>
            </div>
            </div>
            <div class="forecast-card">
            <img class="weekly-img" src="" style="width:100%">
            <div class="container">
                <h4 class="week-day"><b></b></h4>
                <p class="weekly-temperature"></p>
            </div>
            </div>
        </div>
        </div>
    </div>`,
     '/#favorites': `<div class="favorites">
    </div>`
    };

  export default routes;