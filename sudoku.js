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
    return data.reduce((x,y) => x && y.length === len, true);
  }

  function sortNum(a,b) {
    return a-b;
  }

  function areValuesCorrect() {
    var valueToCheck = generateValueToCheck(data.length);
    return getHorizontalArray().reduce(
      (x,y)=>x && y.slice().sort(sortNum).reduce(
        (xx,yy,idx) => xx && valueToCheck[idx]===yy, true), true)
      && getVerticalArray().reduce(
      (x,y)=>x && y.slice().sort(sortNum).reduce(
        (xx,yy,idx) => xx && valueToCheck[idx]===yy, true), true)
      && getSquaresArray().reduce(
       (x,y)=>x && y.slice().sort(sortNum).reduce(
         (xx,yy,idx) => xx && valueToCheck[idx]===yy, true), true)
  }

  function generateValueToCheck(x) {
    return Array.apply(null,Array(x)).map((x,idx)=>idx+1)
  }

  function getHorizontalArray() {
    return data;
  }

  function getVerticalArray() {
    var vert = Array.apply(null,Array(data.length)).map(x=>[]);
    for (var x = 0; x < data.length;x++) {
      for (var y = 0; y < data[x].length; y++) {
        vert[y].push(data[x][y]);
      }
    }
    return vert;
  }

  function getSquaresArray() {
    var square = Array.apply(null,Array(data.length)).map(x=>[]);
    var sqrt = Math.sqrt(data.length);
    for (var x=0;x<sqrt;x++) {
      for (var y=0;y<sqrt;y++) {
        var toBeFilled = square[x*sqrt+y]
        for (var xx=0;xx<sqrt;xx++) {
          for (var yy=0;yy<sqrt;yy++) {
            toBeFilled.push(data[x*sqrt+xx][y*sqrt+yy]);
          }
        }
      }
    }
    return square;
  }

  //   Public methods
  // -------------------------
  return {
    isValid: function() {
      return isDimensionCorrect() && areValuesCorrect();
    }
  };
};
