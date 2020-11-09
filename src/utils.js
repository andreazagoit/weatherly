/* set if city exist */
export const setStatus = (status) => {
    switch (status) {
        case true:
            return document.querySelector('#header__inputStatus').className = "true";
        case false:
            return document.querySelector('#header__inputStatus').className = "false";
        default:
            return document.querySelector('#header__inputStatus').className = "";
    }
}

/* set background image */
export const setWeather = (status) => {
    switch (status) {
        case "Sunny":
        case "Clear":
            return "sunny"
        case "Rain":
            return "rain"
        case "Clouds":
        case "Mist":
        case "Haze":
        case "Clouds":
            return "clouds"
        default:
            return "default"
    }
}

/* set Font Awesome icon */
export const setIcon = (meteo) => {
    switch (meteo) {
        case "Sunny":
        case "Clear":
            return "fa-sun"
        case "Rain":
            return "fa-cloud-showers-heavy"
        case "Clouds":
        case "Mist":
        case "Haze":
            return "fa-cloud"
        default:
            return "default"
    }
}