export default class MarkerList {
  constructor() {
    this.markers = new Set();
    this.changeListeners = new Set();
  }

  addChangeListener(listener) {
    this.changeListeners.add(listener);
  }

  addMarker(marker) {
    marker.addChangeListener(this);
    marker.setRemoveEvent(this.removeMarker.bind(this));

    this.markers.add(marker);
    this.notify();
  }

  removeMarker(marker) {
    console.log(this, this.markers, marker)
    this.markers.delete(marker);
    this.notify();
  }

  notify() {
    for (let listener of this.changeListeners.values()) {
      listener.notify();
    }
  }
}
