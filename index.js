"use strict";

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
}

function ReturnValue(parm) {
  this.hasError = parm && parm.hasError ? parm.hasError : false;
  this.errorCode = parm && parm.errorCode ? parm.errorCode : '';
  this.message = parm && parm.message ? parm.message : '';
  this.returnObject = parm && parm.returnObject ? parm.returnObject : null;
  this.mapData = null;
  this.PutValue = function (key, val) {
    if (this.mapData == undefined) {
      this.mapData = new Object();
      this.mapData[key] = val;
    }
  };
  this.GetValue = function (key) {
    return this.mapData && key in this.mapData ? this.mapData[key] : null;
  };
  this.Reset = function () {
    this.hasError = false;
    this.errorCode = '';
    this.message = '';
    this.returnObject = null;
    this.mapData = null;
  };
}

/* C */
var KOCReturn = {
  Value: function (parm) {
    return new ReturnValue(parm);
  },
  Promise: (function () {
    var _ref = _asyncToGenerator(function* (func) {
      /* L */
      var retValue = KOCReturn.Value();
      try {
        retValue.returnObject = yield func();
      } catch (ex) {
        console.error(ex);
        retValue.hasError = true;
        retValue.message = ex.message;
      }
      return retValue;
    });

    return function Promise(_x) {
      return _ref.apply(this, arguments);
    };
  })()
};

module.exports = KOCReturn;
