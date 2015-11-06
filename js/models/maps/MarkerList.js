export default class MarkerList {
  constructor() {
    this.markers = new Set();
    this.changeListeners = new Set();
  }

  saveData() {
    console.log(
      JSON.stringify([...this.markers].map( (marker)=>marker.marker.position )
        .map(position => {return{lng:position.lng(), lat:position.lat()}}))
    );
    // console.log(this.markers.map( (marker)=> {
    //   return marker;
    //   // return {lat: marker.marker.position.lat(),
    //   // lng: marker.marker.position.lng()};
    // });
  }

  addChangeListener(listener) {
    this.changeListeners.add(listener);
  }

  addMarker(marker) {
    marker.addChangeListener(this);
    marker.setRemoveEvent(this.removeMarker.bind(this));

    this.markers.add(marker);
    this.saveData();
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
