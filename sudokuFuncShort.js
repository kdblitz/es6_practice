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
    return data.every(rowToCheck => rowToCheck.length === len);
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
    return dataToCheck.every(rowToCheck =>
      rowToCheck.slice().sort(sortNum).every(
        (itemToCheck,idx) => expectedValues[idx] === itemToCheck))
  }

  function generateValueToCheck(x) {
    return Array.apply(null,Array(x)).map((x,idx)=>idx+1)
  }

  function getHorizontalArray() {
    return data;
  }

  function getVerticalArray() {
    return data[0].map( (ignored,colIdx) => data.map( (row) => row[colIdx] ) );
  }

  function getSquaresArray() {
    var squares = [];
    var sqrt = Math.sqrt(data.length);
    for (var x=0;x<sqrt;x++) {
      for (var y=0;y<sqrt;y++) {
        squares.push( Array.apply(null,Array(sqrt)).reduce(
          (container, ignored, idx) => container.concat( data[x*sqrt+idx].slice(y*sqrt,(y+1)*sqrt) ), []));
      }
    }
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
