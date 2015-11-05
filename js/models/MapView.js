import Marker from './Marker';

export default class MapView {
  constructor (targetId) {
    this.targetId = targetId;
    this.markerList = [];
    this.listeners = [];
  }
  initMap ({lat=13, lng=122, zoom=6} = {}) {
    this.mapObj = new google.maps.Map(document.querySelector(`#${this.targetId}`), {
      zoom,
      center: {lat, lng}
    });
    this.addListener();
    return this;
  }

  get map () {
    return this.mapObj;
  }

  addListener() {
    this.map.addListener('click',ev => {
      this.markerList.push(new Marker(this.map, ev.latLng));
      for (let listener of this.listeners) {
        listener.notify();
      }
    });

   }

  subscribe(listener) {
    this.listeners.push(listener);
  }
}
