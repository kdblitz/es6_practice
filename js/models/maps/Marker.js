import ColorGenerator from 'models/generators/ColorGenerator';
import LabelGenerator from 'models/generators/LabelGenerator';
class InfoWindow {
  constructor(content) {
    this.id = _.uniqueId('InfoWindow')
    this.content = content;
    this.info = new google.maps.InfoWindow({
      content:`<div id="${this.id}"></div>`
    });
    this.changeListeners = new Set();
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
    }).bind(this) );

    $info.appendChild($label);
    $info.appendChild($editButton);
  }

  editMode() {
    let $info = this.getDom();
    $info.innerHTML = '';

    let $input = document.createElement('input');
    $input.type = 'text';
    $input.className = 'form-control';
    $input.value = this.content;

    let $saveButton = document.createElement('button');
    $saveButton.className = 'btn btn-primary';
    $saveButton.innerHTML = 'Save';
    $saveButton.addEventListener('click',(()=> {
      this.content = $input.value;
      this.notify();
      this.viewMode();
    }).bind(this));

    $info.appendChild($input);
    $info.appendChild($saveButton);
  }

  addChangeListener(listener) {
    this.changeListeners.add(listener);
  }

  notify() {
    for (let listener of this.changeListeners.values()) {
      listener.notify();
    }
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
    this.infoWindow.addChangeListener(this);
    this.addEventListeners();
    this.map = map;
    this.changeListeners = new Set();
  }

  addEventListeners() {
    this.marker.addListener('click', () => {
      this.infoWindow.info.open(this.map, this.marker);
      this.infoWindow.viewMode();
    });
  }

  get description() {
    return this.infoWindow.content;
  }

  addChangeListener(listener) {
    this.changeListeners.add(listener);
  }

  setRemoveEvent(evt) {
    this.removeEvent = evt;
  }

  remove() {
    this.removeEvent(this);
    this.marker.setMap(null);
  }

  notify() {
    for (let listener of this.changeListeners.values()) {
      listener.notify();
    }
  }
}
