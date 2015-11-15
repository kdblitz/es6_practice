export default class MarkerLocalStorage {
  loadData () {
    return (localStorage['markers']) ? JSON.parse(localStorage['markers']) : [];
  }

  saveData (data) {
    localStorage['markers'] = JSON.stringify(data);
  }
}
