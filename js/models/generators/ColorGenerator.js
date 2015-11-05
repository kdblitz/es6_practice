export default class ColorGenerator {
  getRandomHex () {
    let num = _.random(0, 255).toString(16);
    return (num < 2) ? `0${num}` : num;
  }

  getRandomColor () {
    return `#${ _.times(3).map(() => this.getRandomHex()).join('') }`;
  }
}

export default new ColorGenerator();
