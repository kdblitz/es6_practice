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
    return data.every(y => y.length === len);
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
    var checkItemsInRow = (itemToCheck,idx) => expectedValues[idx] === itemToCheck;
    var isRowComplete = rowToCheck => rowToCheck.slice().sort(sortNum).every(checkItemsInRow);
    return dataToCheck.every(isRowComplete);
  }

  function generateValueToCheck(x) {
    return Array.apply(null,Array(x)).map((x,idx)=>idx+1)
  }

  function getHorizontalArray() {
    return data;
  }

  function getVerticalArray() {
    return data[0].map( (xx,col) => data.map( (row) => row[col] ) );
    // return data[0].map(
    //   (whatever,col) => {
    //     return data.map( (row) => {
    //       return row[col]
    //     } )
    //   }
    // );
  }

  function getSquaresArray() {
    var squares = [];
    var sqrt = Math.sqrt(data.length);
    for (var x=0;x<sqrt;x++) {
      for (var y=0;y<sqrt;y++) {
        var getSquareLine = (container, dummy, idx) => container.concat( data[x*sqrt+idx].slice(y*sqrt,(y+1)*sqrt) )
        squares.push(Array.apply(null,Array(sqrt)).reduce(getSquareLine, []));
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
