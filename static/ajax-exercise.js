'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then( (evt) => evt.text() )

    .then( (evtTXT) => {
      // console.log(evtTXT)
      // console.log(typeof evtTXT)
      const fortuneDiv = document.querySelector('#fortune-text');
      fortuneDiv.innerHTML = evtTXT;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  // /weather.json?zipcode=94110

  const new_url = url + "?zipcode=" + zipcode;

    fetch(new_url)
      .then( (evt) => evt.json() )
      .then( (evtJSON) => {
        console.log(evtJSON)
        const weather = document.querySelector('#weather-info');
        weather.innerText = evtJSON['forecast'];
      });
  
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    qty: document.querySelector('#qty-field').value, // what the user typed in
    melon_type: document.querySelector('#melon-type-field').value
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      console.log(response);
      return response.json(); //turn the whole dictionary into a string
    })
    .then((responseTEXT) => { //responseText is an string
      console.log(responseTEXT)
      const orderStatus = document.querySelector('#order-status');
      // orderStatus.innerText = responseTEXT['msg'];
      if (responseTEXT['code'] === 'ERROR') {

        orderStatus.classList.add('order-error');
      }
      else {
          orderStatus.classList.remove('order-error');
      };
      orderStatus.innerText = responseTEXT['msg'];
    })
  }
  // if the result_code === 'ERROR', then...
  // add the .order-error class to the order status div
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

document.querySelector('#order-form').addEventListener('submit', orderMelons);

document.querySelector('#get-dog-image').addEventListener('click', () => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      const imageURL = result.message;
      document
        .querySelector('#dog-image')
        .insertAdjacentHTML('beforeend', `<div><img src=${imageURL}></div>`);
    });
});