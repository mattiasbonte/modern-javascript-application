// Get previous city from local storage
export function getCity(id) {
  if (localStorage.getItem(`Prev City ${id}`) !== null) {
    const city = localStorage.getItem(`Prev City ${id}`).toString();
    document.querySelector(`#input${id}`).value = city;
  }
}

// Save/Update submitted city in local storage
export function setCity(city, country, id) {
  console.log('settttCity run');
  localStorage.setItem(`Prev City ${id}`, `${city}, ${country}`);
}

// Set previous city name in input fields
export function setPreviousCity() {
  // Check previous city, if set, add to input field
  if (localStorage.getItem('Prev City Left') !== null) {
    getCity('Left');
  }
  if (localStorage.getItem('Prev City Right') !== null) {
    getCity('Right');
  }
}
