const API_KEY = ''

var cityName = "";
var cityExist = false;
var cityList = []

const container = document.querySelector(".weather-card-list")
const input = document.querySelector('input')
const cityStatus = document.querySelector('#header__inputStatus')

/* Input listener */
input.addEventListener('input', (event) => {

    /* Set default exist status */
    setStatus()

    /* check if city exist */
    if (input.value !== '') {
        try {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`)
                .then(data => {
                    if (data.status == 200) {
                        /* City exist */
                        cityExist = true;
                        setStatus(true)
                        data.json().then(JSONData => {
                            cityName = JSONData.name
                        })
                    } else {
                        /* City not exist */
                        cityExist = false;
                        cityName = null;
                        setStatus(false)
                    }
                })
        } catch (error) {
            alert(error)
        }
    }
});

/* Get API data */
const getData = () => {
    /* Get local city list */
    cityList = JSON.parse(localStorage.getItem("cityList"))
    /* Hide intro alert banner */
    try {
        /* check if city list have 1 or more elements */
        if (cityList.length > 0) {
            document.querySelector('.alert').style.display = 'none'
        }
    } catch (error) {
        /* create city list if not exist */
        const cityList = []
    }
    container.innerHTML = ""
    if (cityList) {
        cityList.forEach(city => {
            try {
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
                    .then(data => {
                        if (data.status == 200) {
                            /* City exist */
                            data.json().then(JSONdata => {
                                container.innerHTML += `<div class="weather-card ${setWeather(JSONdata.weather[0].main)}"><div class="weather-card__content"><div class="weather-card__contentMeteo"><i class="fas ${setIcon(JSONdata.weather[0].main)} "></i><p> ${JSONdata.weather[0].main} </p></div><div class="weather-card__contentCity"><h1> ${Math.round(JSONdata.main.temp)} °</h1><h2>${JSONdata.name}</h2></div></div ><div class="weather-card__delete" onClick="removeCity('${JSONdata.name}')"><i class="fas fa-times"></i></div></div >`
                            })
                        }
                    })
            } catch (error) {
                alert(error)
            }
        });
    }
}

/* set Font Awesome icon */
const setIcon = (meteo) => {
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

/* add city to localStorage */
function addCity() {
    /* Check if input city exist */
    if (cityExist) {
        /* Check if local city list exist */
        if (cityList) {
            /* Check if city is not in local city list*/
            if (!cityList.includes(cityName)) {
                cityList.push(cityName)
                input.value = ''
                setStatus()
            } else {
                /* city exist local */
                alert('Città già presente')
            }
        } else {
            /* create city list */
            cityList = [cityName]
        }
        /* set local storage */
        localStorage.setItem("cityList", JSON.stringify(cityList))
        getData()
    } else {
        alert("La Città non esiste")
    }
}

/* remove city from localStorage */
function removeCity(cityName) {
    /* get local city list */
    const cityList = JSON.parse(localStorage.getItem("cityList"))
    /* remove city from array */
    const newCityList = cityList.filter(city => {
        if (city !== cityName) return city
    })
    /* set updated city list to localstorage */
    localStorage.setItem("cityList", JSON.stringify(newCityList))
    /* update API data */
    getData()
}

/* set if city exist */
const setStatus = (status) => {
    switch (status) {
        case true:
            return cityStatus.className = "true";
        case false:
            return cityStatus.className = "false";
        default:
            return cityStatus.className = "";
    }
}

/* set background image */
const setWeather = (status) => {
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

/* get initial data */
if (API_KEY == '') {
    alert('Please add your own API KEY')
} else {
    getData()
}

/* remove cover after animation */
document.querySelector('.cover').addEventListener("animationend", function () {
    document.body.className = 'scroll'
    document.querySelector('.cover').style.display = 'none'
});