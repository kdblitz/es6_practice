import ColorGenerator from './generators/ColorGenerator';
import LabelGenerator from './generators/LabelGenerator';

class InfoWindow {
  constructor(content) {
    this.id = _.uniqueId('InfoWindow')
    this.content = content;
    this.info = new google.maps.InfoWindow({
      content:`<div id="${this.id}"></div>`
    });
    // this.viewMode();
  }

  getDom() {
    return document.querySelector(`#${this.id}`);
  }

  viewMode() {
    let $info = this.getDom()
    $info.innerHTML = '';

    let $label = document.createElement('h3');
    $label.innerHTML = this.content;
    $label.style.color = ColorGenerator.getRandomColor();

    let $editButton = document.createElement('button');
    $editButton.innerHTML = 'Edit me';
    $editButton.addEventListener('click', (() => {
      this.editMode();
    }).bind(this) )

    $info.appendChild($label);
    $info.appendChild($editButton);
  }

  editMode() {
    this.getDom().innerHTML = `<input type="text" value="${this.content}">`;
  }
}

export default class Marker {
  constructor (map, latLng, description = LabelGenerator.next().value) {
    this.marker = new google.maps.Marker({
      position: latLng,
      map,
      title:description
    });
    this.infoWindow = new InfoWindow(description);
    this.addListener();
    this.map = map;
    this.description = description;
  }

  addListener() {
    this.marker.addListener('click', () => {
      this.infoWindow.info.open(this.map, this.marker);
      this.infoWindow.viewMode();
    });
  }
}
