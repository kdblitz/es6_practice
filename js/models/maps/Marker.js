import ColorGenerator from 'models/generators/ColorGenerator';
import LabelGenerator from 'models/generators/LabelGenerator';
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
      this.viewMode();
    }).bind(this));

    $info.appendChild($input);
    $info.appendChild($saveButton);
  }

  save() {
    let $info = this.getDom();
    console.log($info.querySelector('input').value);
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
