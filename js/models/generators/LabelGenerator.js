class LabelGenerator {
  constructor () {
    this.labels = ['@_@', '>_<', '^_^', '~_~', '>_>', '$_$'];
  }

  *[Symbol.iterator] () {
    let current = 0;
    while (true) {
      yield this.labels[current % this.labels.length];
      current++;
    }
  }
}

let labelGenerator = new LabelGenerator();
export default labelGenerator[Symbol.iterator]();
