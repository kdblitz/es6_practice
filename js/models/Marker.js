import LabelGenerator from './generators/LabelGenerator';
import InfoWindow from './InfoWindow';

export default class Marker {
  constructor (map, latLng, description = LabelGenerator.next().value) {
    this.marker = new google.maps.Marker({
      position: latLng,
      map,
      title:description
    });
    this.infoWindow = new InfoWindow(description).info;
    this.addListener();
    this.map = map;
    this.description = description;
  }

  addListener() {
    this.marker.addListener('click', () => {
      this.infoWindow.open(this.map, this.marker);
    });
  }
}
