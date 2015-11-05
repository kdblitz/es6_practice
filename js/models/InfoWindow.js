import ColorGenerator from './generators/ColorGenerator';

export default class InfoWindow {
  constructor(content) {
    this.info = new google.maps.InfoWindow({
      content:`<div><h3 style="color:${ColorGenerator.getRandomColor()}">${content}</h3></div>`
    });
  }
}
