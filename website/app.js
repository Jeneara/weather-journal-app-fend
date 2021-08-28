/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=c0a5556d3985c18a8a409bdb583e60a5';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateWeather);

//Function of Event Listener
function generateWeather(e) {
  //Variables
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, zip, apiKey)
    // New Syntax!
    .then(function (weatherData) {
      console.log(weatherData)
      // Add data
      const temp = weatherData.main.temp;
      const feeling = feelings;
      postData('/postData', {
          temp: temp,
          feeling: feeling,
          date: newDate
        })
        .then(function () {
          updateUI();
        });
    });
}

//Get Web API Data
const getWeather = async (baseURL, zip, apiKey) => {
  //Build URL into Fetch Call
  const res = await fetch(baseURL + zip + apiKey)
  //Call the API
  try {
    const weatherData = await res.json();
    console.log(weatherData)
    return weatherData;
    // appropriately handle the error
  } catch (error) {
    console.log("error", error);
  }
}

//Get Project Data Function
const getData = async (url = '', data = {}) => {
  const request = await fetch(url);
  try {
    const getData = await request.json()
    console.log(getData);
    // appropriately handle the error
  } catch (error) {
    console.log("error", error);
  }
};


//Post Data Function
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), // body data type must match "Content-Type" header   
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
    // appropriately handle the error
  } catch (error) {
    console.log("error", error);
  }
}


//Update UI
const updateUI = async () => {
  const request = await fetch('/all');
  console.log('UpdateUI request', request);
  try {
    const entry = await request.json()
    console.log('entry', entry)
    document.getElementById('temp').innerHTML = entry["temp"];
    document.getElementById('content').innerHTML = entry["feeling"];
    document.getElementById('date').innerHTML = entry["date"];

  } catch (error) {
    console.log("error", error);
  }
};