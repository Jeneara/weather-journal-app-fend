/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=c0a5556d3985c18a8a409bdb583e60a5';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

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
      const temperature = weatherData.main.temp;
      const city = weatherData.name;
      const feeling = feelings;
      postData('/addWeather', {
          temp: temperature,
          city: city,
          date: newDate,
          feeling: feeling,
          zip: zip
        })
        .then()
      updateUI();
    });
}

//Get Web API Data
const getWeather = async (baseURL, zip, apiKey) => {
  //Build URL into Fetch Call
  const res = await fetch(baseURL + zip + '&units=metric' + apiKey)
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
const getData = async () => {
  const request = await fetch('/all');
  try {
    console.log('req  ', request)
    const getData = await request.json()
    console.log(getData);
    return getData;
    // appropriately handle the error
  } catch (error) {
    console.log("error", error);
  }
}



//Post Data Function
const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}


// //Update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    console.log(allData)
    document.getElementById('temp').innerHTML = allData.temp + 'c';
    document.getElementById('content').innerHTML = allData.feeling;
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('city').innerHTML = allData.city;

  } catch (error) {
    console.log("error", error);
  }
};