import API_KEY from './env'
import { addCity, removeCity, getData } from './city'
import { setStatus } from './utils'

/* REDIRECT TO HTTPS */
var loc = window.location.href + '';
if (loc.indexOf('http://') == 0) {
    window.location.href = loc.replace('http://', 'https://');
}


/* SET API KEY */
window.API_KEY = API_KEY

/* SET GLOBAL VARIABLES */
window.addCity = addCity
window.removeCity = removeCity
window.getData = getData
window.setStatus = setStatus

window.cityName = "";
window.cityExist = false;
window.cityList = []

/* CHECK INPUT CITY */
const input = document.querySelector('input')
input.addEventListener('input', (event) => {
    if (input.value !== '') {
        try {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`)
                .then(data => {
                    if (data.status == 200) {
                        /* CITY EXIST */
                        data.json().then(JSONData => {
                            window.cityName = JSONData.name
                        })
                        window.cityExist = true;
                        console.log('Exist');
                        setStatus(true)
                    } else {
                        /* CITY NOT EXIST */
                        cityName = null;
                        cityExist = false;
                        console.log('Not Exist');
                        setStatus(false)
                    }
                })
        } catch (error) {
            alert(error)
        }
    }
});

/* Remove cover after animation */
document.querySelector('.cover').addEventListener("animationend", function () {
    document.body.className = 'scroll'
    document.querySelector('.cover').style.display = 'none'
});


/* GET STARTING DATA */
getData()