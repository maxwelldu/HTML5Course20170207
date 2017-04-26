'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/**
 * Created by sks on 2017/4/26.
 */
{
  var a = 1,
      b = 2;
  var _ref = [a, b];
  b = _ref[0];
  a = _ref[1];

  console.log(a, b);
}

{
  var _a = 1,
      _b = 2,
      rest = [3, 4, 5, 6];

  console.log(_a, _b, rest);
}

{
  var _a2 = void 0,
      _b2 = void 0;
  var _a$b = { a: 1, b: 2 };
  _a2 = _a$b.a;
  _b2 = _a$b.b;

  console.log(_a2, _b2);
}

{
  var _ref2 = [1, 2],
      _a3 = _ref2[0],
      _b3 = _ref2[1],
      _ref2$ = _ref2[2],
      c = _ref2$ === undefined ? 3 : _ref2$;

  console.log(_a3, _b3, c);
}

{
  var f = function f() {
    return [1, 2];
  };

  var _f = f(),
      _f2 = _slicedToArray(_f, 2),
      _a4 = _f2[0],
      _b4 = _f2[1];

  console.log(_a4, _b4);
}

{
  var _f3 = function _f3() {
    return [1, 2, 3, 4, 5];
  };

  var _f4 = _f3(),
      _f5 = _toArray(_f4),
      _a5 = _f5[0],
      _b5 = _f5.slice(2);

  console.log(_a5, _b5);
}

{
  var o = { p: 42, q: true };
  var p = o.p,
      q = o.q;

  console.log(p, q);
}

{
  var _a7 = { a: 3 },
      _a7$a = _a7.a,
      _a6 = _a7$a === undefined ? 10 : _a7$a,
      _a7$b = _a7.b,
      _b6 = _a7$b === undefined ? 5 : _a7$b;

  console.log(_a6, _b6);
}

{
  var metaData = {
    title: "abc",
    test: [{
      title: 'test',
      desc: 'description'
    }]
  };

  var esTitle = metaData.title,
      _metaData$test = _slicedToArray(metaData.test, 1),
      cnTitle = _metaData$test[0].title;

  console.log(esTitle, cnTitle);
}