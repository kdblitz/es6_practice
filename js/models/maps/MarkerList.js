import MarkerLocalStorage from 'models/persistence/MarkerLocalStorage';

let storage = new MarkerLocalStorage();

export default class MarkerList {
  constructor (lclstorage = storage) {
    this.storage = lclstorage;
    this.markers = new Set();
    this.changeListeners = new Set();
  }

  saveData () {
    let markers = [...this.markers].map((marker) => {
      let position = marker.marker.position;
      return {
        description: marker.infoWindow.content,
        lng: position.lng(),
        lat: position.lat()
      };
    });
    this.storage.saveData(markers);
  }

  addChangeListener (listener) {
    this.changeListeners.add(listener);
  }

  addMarker (marker) {
    marker.addChangeListener(this);
    marker.setRemoveEvent(this.removeMarker.bind(this));

    this.markers.add(marker);
    this.notify();
  }

  removeMarker (marker) {
    this.markers.delete(marker);
    this.notify();
  }

  notify () {
    this.saveData();
    for (let listener of this.changeListeners.values()) {
      listener.notify();
    }
  }
}
