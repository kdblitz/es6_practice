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
  }
  initMap ({lat=13, lng=122, zoom=6} = {}) {
    this.mapObj = new google.maps.Map(document.querySelector(`#${this.targetId}`), {
      zoom,
      center: {lat, lng}
    });
    return this;
  }

  get map () {
    return this.mapObj;
  }

  addListener(evtHandler) {
    this.map.addListener('click',evtHandler);
  }
}

const kmap = new MapView('maps').initMap({zoom:5});
kmap.addListener( ev => {
  new Marker(kmap.map, ev.latLng);
});
