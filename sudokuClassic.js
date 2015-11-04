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
    for (var key in data) {
      if (data[key] !== len)
        return true;
    }
    return false;
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
    for (var key in dataToCheck) {
      var mySet = dataToCheck[key].slice().sort(sortNum);
      for (var idx in expectedValues) {
        if (mySet[idx] !== expectedValues[idx]) {
          return false;
        }
      }
    }
    return true;
  }


  function generateValueToCheck(length) {
    var val = [];
    for (var ctr=1;ctr<=length;ctr++) {
      val.push(ctr);
    }
    return val;
  }

  function getHorizontalArray() {
    return data;
  }

  function create2dArray(size) {
    var container = [];
    for (var ctr=0;ctr<size;ctr++) {
      container.push([])
    }
    return container;
  }

  function getVerticalArray() {
    var vert = create2dArray(data.length);
    for (var x = 0; x < data.length;x++) {
      for (var y = 0; y < data[x].length; y++) {
        vert[y].push(data[x][y]);
      }
    }
    return vert;
  }

  function getSquaresArray() {
    var squares = [];
    var sqrt = Math.sqrt(data.length);
    for (var x=0;x<sqrt;x++) {
      for (var y=0;y<sqrt;y++) {
        var square = [];
        for (var xx=0;xx<sqrt;xx++) {
          for (var yy=0;yy<sqrt;yy++) {
            square.push(data[x*sqrt+xx][y*sqrt+yy]);
          }
        }
        squares.push(toBeFilled);
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
