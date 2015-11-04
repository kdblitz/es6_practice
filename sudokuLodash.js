var Sudoku = function(data)
{
  //   Private methods
  // -------------------------
  this.data = data;

  function isDimensionCorrect() {
    var len = data.length;
    var sqrt = Math.sqrt(len)
    if (Math.round(sqrt) !== sqrt) {
      return false;
    }
    return _.every(_.map(data, row => row.length === len));
  }

  function sortNum(a,b) {
    return a-b;
  }

  function areValuesCorrect() {
    var valueToCheck = generateValueToCheck(data.length);
    return isSetComplete(getHorizontalArray(), valueToCheck)
      && isSetComplete(getVerticalArray(), valueToCheck)
      && isSetComplete(getSquaresArray(), valueToCheck);
  }

  function isSetComplete(dataToCheck, expectedValues) {
    return _.every(_.map(dataToCheck, row => _.isEqual(row.slice().sort(sortNum),expectedValues)));
  }

  function generateValueToCheck(x) {
    return _.range(1, x + 1);
  }

  function getHorizontalArray() {
    return data;
  }

  function getVerticalArray() {
    return _.zip.apply(null, data);
  }

  function getSquaresArray() {
    var squares = [];
    var sqrt = Math.sqrt(data.length);
    _.times(sqrt).forEach( x =>
      _.times(sqrt).forEach( y =>
        squares.push( _.times(sqrt).reduce(
          (container, ignored, idx) => container.concat( data[y*sqrt+idx].slice(x*sqrt,(x+1)*sqrt) ), []))
      )
    )
    return squares;
  }

  //   Public methods
  // -------------------------
  return {
    isValid: function() {
      return isDimensionCorrect() && areValuesCorrect();
    }
  };
};
