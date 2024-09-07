'use strict'

// getting all the text fields from HTMl file 
const weatherContainerTemp = document.querySelector('.weather_container_temp')
const weatherContainerLocation = document.querySelector('.weather_container_location')
const weatherContainerDate = document.querySelector('.weather_container_date')
const weatherContainerCondition = document.querySelector('.weather_container_condition')

// form fields 
const searchField = document.querySelector('.weather_navbar > form > input')
const searchBtn = document.querySelector('.weather_navbar > form > button')

// http://api.weatherapi.com/v1/current.json?key=077e43c2c9214d62948124009242108&q=Vladimir&aqi=no

// just my city for the default property 
let targetLocation = 'Vladimir';

// async function that uses free weather API and gets such parametres as city, time, date and temperature 
const getResults = async (location) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=077e43c2c9214d62948124009242108&q=${targetLocation}&aqi=no`;
    const response = await fetch(url)
    const data = await response.json()
    let locationName = data.location.name;
    let temp = data.current.temp_c;
    let time = data.location.localtime;
    let condition = data.current.condition.text

    // call function below to update information after clicking the button 
    updateDetails(temp, locationName, time, condition)
}

// function which change the HTML fields to API properties from above 
function updateDetails(temp, locationName, time, condition) {

    // splitting time and day into 2 variables to customize 

    let splitDate = time.split(' ')[0]
    let splitTime = time.split(' ')[1]

    // using in-built js function 

    let currentDay = getDayName(new Date(splitDate).getDay())

    weatherContainerTemp.textContent = temp;
    weatherContainerLocation.textContent = locationName;
    weatherContainerDate.textContent = `${splitDate} ${currentDay} ${splitTime}`;
    weatherContainerCondition.textContent = condition
}

// search the information from input tag value
async function searchForLocation(element) {
    element.preventDefault()
    targetLocation = searchField.value
    getResults(targetLocation)
}

searchBtn.addEventListener('click', searchForLocation)

getResults(targetLocation)

function getDayName(num) {
    switch (num) {
        case 0:
            return 'Sunday';
            break
        case 1:
            return 'Monday';
            break
        case 2:
            return 'Tuesday';
            break
        case 3:
            return 'Wednesday';
            break
        case 4:
            return 'Thursday';
            break
        case 5:
            return 'Friday';
            break
        case 6:
            return 'Saturday';
            break
    }
}