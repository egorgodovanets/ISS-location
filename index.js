const coordinates = 'http://api.open-notify.org/iss-now.json';
const people = 'http://api.open-notify.org/astros.json';

function getISSPosition(map, marker) {
  setInterval(() => {
    fetch(coordinates)
    .then(response => response.json())
    .then(json => {
      marker.setPosition(new google.maps.LatLng(json.iss_position.latitude, json.iss_position.longitude))
      map.setCenter(new google.maps.LatLng(json.iss_position.latitude, json.iss_position.longitude)) 
      document.getElementById('latitude').innerHTML = `latitude: ${json.iss_position.latitude},`  
      document.getElementById('longitude').innerHTML = `longitude: ${json.iss_position.longitude}`      
    })
  }, 5000) 
}

function getISSPeople(people) {
  setInterval(() => {
    fetch(people)
    .then(response => response.json())
    .then(json => {
      let peopleStr = '';
      json.people
      .filter(el => el.craft === 'ISS')
      .forEach(element => {
        peopleStr += `<p> ${element.name} <p>`  
      });

      document.getElementById('who-at-ISS').innerHTML = peopleStr;
  
      document.getElementById('amount').innerHTML = `Total amount: ${json.people.filter(el => el.craft === 'ISS').length} people in ISS`
    })
  }, 5000)
}
getISSPeople(people)

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
  });
  const marker = new google.maps.Marker({
    map,
  });
  getISSPosition(map, marker)
}
window.initMap = initMap;

function dateUTC() {
  setInterval(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const now = today.toLocaleString('en-US', options);
    document.getElementById('data-time').innerHTML = `Current UTC time: ${today.getUTCHours()}:${today.getUTCMinutes()}:${today.getUTCSeconds()}, ${now}`
  }, 5000)
}
dateUTC()
  

