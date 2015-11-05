'use strict';
class LabelGenerator {
  constructor() {
    this.labels = ['@_@', '>_<', '^_^','~_~','>_>','$_$'];
  }

  *[Symbol.iterator]() {
    let current = 0;
    while (true) {
      yield this.labels[current % this.labels.length];
      current++;
    }
  }
}

class ColorGenerator {
  getRandomHex() {
    let num = _.random(0,255).toString(16);
    return (num < 2) ? `0${num}` : num;
  }

  getRandomColor() {
    return `#${ _.times(3).map(()=>this.getRandomHex()).join('') }`;
  }
}

let labelGenerator = new LabelGenerator();
let labelGeneratorIterator = labelGenerator[Symbol.iterator]();
let colorGenerator = new ColorGenerator();

class InfoWindow {
  constructor(content) {
    this.info = new google.maps.InfoWindow({
      content:`<div><h3 style="color:${colorGenerator.getRandomColor()}">${content}</h3></div>`
    });
  }
}

class Marker {
  constructor (map, latLng, description = labelGeneratorIterator.next().value) {
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

class MapView {
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
        console.log('triggered');
        listener.notify();
      }
    });

   }

  subscribe(listener) {
    this.listeners.push(listener);
  }
}

class MarkersView {
  constructor(mapView) {
    this.mapView = mapView;
    mapView.subscribe(this);
  }

  createListItemAngularMaterial() {
    let $list = document.createElement('md-list-item');
    let $div = document.createElement('div');
    $div.className = "md-list-item-text";

    let $label = document.createElement('h3');
    $label.innerHTML = ':D';
    let $button = document.createElement('md-button');
    $button.className = 'md-fab md-mini md-warn';
    $button.appendChild(document.createTextNode('x'));

    $list.appendChild($div);
    $div.appendChild($label);
    $div.appendChild($button);
    return $list;
  }

  createListItemBootstrap() {
    let $list = document.createElement('div');
    $list.className = 'list-group-item';

    let $label = document.createElement('span');
    $label.innerHTML = ':D';
    let $button = document.createElement('button');
    $button.className = 'btn btn-danger btn-xs pull-right';
    $button.appendChild(document.createTextNode('x'));

    $list.appendChild($label);
    $list.appendChild($button);
    return $list;
  }

  createListItemMdl(marker) {
    let $list = document.createElement('li');
    $list.className = 'mdl-navigation__link';

    let $button = document.createElement('button');
    $button.className = 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab pull-right';
    // let $icon = document.createElement('i');
    // $icon.className = 'material-icons';
    // $icon.innerHTML = 'clear';
    // $button.appendChild($icon);

    $list.appendChild(document.createTextNode(marker.description));
    // $list.appendChild($button);
    return $list;
  }

  regenerateList() {
    let markerList = document.querySelector('[hook="markerListView"]');
    markerList.innerHTML = '';
    for (let marker of this.mapView.markerList) {
      markerList.appendChild(this.createListItemMdl(marker));
    }
  }

  notify() {
    this.regenerateList();
  }
}

const kmap = new MapView('maps').initMap({zoom:5});
const markerList = new MarkersView(kmap).regenerateList();
