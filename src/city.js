import { setWeather, setIcon, setStatus } from './utils'

export const addCity = (cityName) => {
    console.log('ADD', window.cityName);
    if (window.cityExist) {
        if (window.cityList) {
            if (!window.cityList.includes(window.cityName)) {
                window.cityList.push(window.cityName)
                document.querySelector('input').value = ''
                setStatus()
            } else {
                alert('Città già presente')
            }
        } else {
            window.cityList = [window.cityName]
        }
        localStorage.setItem("cityList", JSON.stringify(window.cityList))
    } else {
        alert("La Città non esiste")
    }
    window.getData()
}

export const removeCity = (cityName) => {
    console.log('REMOVE', window.cityName);
    /* get local city list */
    const cityList = JSON.parse(localStorage.getItem("cityList"))
    /* remove city from array */
    const newCityList = cityList.filter(city => {
        if (city !== cityName) return city
    })
    /* set updated city list to localstorage */
    localStorage.setItem("cityList", JSON.stringify(newCityList))
    /* update API data */
    window.getData()
}

export const getData = () => {
    cityList = JSON.parse(localStorage.getItem("cityList"))
    console.log('City list', cityList);
    /* GEOLICALIZATION */
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(GEOData => {
            const lat = GEOData.coords.latitude;
            const lon = GEOData.coords.longitude;
            try {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${window.API_KEY}&units=metric`)
                    .then(data => {
                        if (data.status == 200) {
                            data.json().then(JSONdata => {
                                container.innerHTML = `<div class="weather-card ${setWeather(JSONdata.weather[0].main)}"><div class="weather-card__content"><div class="weather-card__contentMeteo"><i class="fas ${setIcon(JSONdata.weather[0].main)} "></i><p> ${JSONdata.weather[0].main} </p></div><div class="weather-card__contentCity"><h1> ${Math.round(JSONdata.main.temp)} °</h1><h2>${JSONdata.name}</h2></div></div></div>` + container.innerHTML
                            })
                        }
                    })
            } catch (error) {
                alert(error)
            }
        });
    } else {
        console.log('La geo-localizzazione NON è possibile');
    }

    try {
        if (cityList.length > 0) {
            console.log('City List Exist');
        }
    } catch (error) {
        const cityList = []
    }
    const container = document.querySelector(".weather-card-list")
    container.innerHTML = ""
    if (cityList) {
        cityList.forEach(city => {
            try {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${window.API_KEY}&units=metric`)
                    .then(data => {
                        if (data.status == 200) {
                            data.json().then(JSONdata => {
                                container.innerHTML += `<div class="weather-card ${setWeather(JSONdata.weather[0].main)}"><div class="weather-card__content"><div class="weather-card__contentMeteo"><i class="fas ${setIcon(JSONdata.weather[0].main)} "></i><p> ${JSONdata.weather[0].main} </p></div><div class="weather-card__contentCity"><h1> ${Math.round(JSONdata.main.temp)} °</h1><h2>${JSONdata.name}</h2></div></div ><div class="weather-card__delete" onClick="window.removeCity('${JSONdata.name}')"><i class="fas fa-times"></i></div></div >`
                            })
                        }
                    })
            } catch (error) {
                alert(error)
            }
        });
    }
}