console.log('Static javascript file served');

function getWeather(address, callback) {
  fetch('http://localhost:3000/weather?address=' + address).then(res => {
    res.json().then(data => {
      if (data.error) {
        callback(data.error);
      } else {
        callback(data);
      }
    });
  });
}

function getWeatherReport(e) {
  e.preventDefault();
  document.querySelector('.weather-details').textContent = 'Loading...';
  const address = document.querySelector('form input').value;
  console.log(address);
  if (address) {
    getWeather(address, res => {
      console.log('res', res);
      if (res.temperature) {
        document.querySelector('.weather-details').innerHTML =
          'address: ' +
          res.address +
          '<br/>' +
          'temperature: ' +
          res.temperature +
          '<br/>' +
          'it feelsLike: ' +
          res.feelsLike;
      } else {
        document.querySelector('.weather-details').innerHTML = res;
      }
    });
  } else {
    document.querySelector('.weather-details').innerHTML =
      'Please enter the address';
  }
}