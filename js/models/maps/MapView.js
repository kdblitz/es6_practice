import Marker from './Marker';

export default class MapView {
  constructor (targetId, markerList) {
    this.targetId = targetId;
    this.markerList = markerList;
  }

  initMap ({lat = 13, lng = 122, zoom = 6} = {}) {
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

  addListener () {
    this.map.addListener('click', ev => {
      this.markerList.addMarker(new Marker(this.map, ev.latLng));
    });
  }

  loadData (loadedMarkers) {
    for (let marker of loadedMarkers) {
      this.markerList.addMarker(new Marker(this.map, {lat: marker.lat, lng: marker.lng}, marker.description));
    }
  }
}
