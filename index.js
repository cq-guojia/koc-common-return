"use strict";

module.exports = (parm) => {
  return new ReturnValue(parm);
};

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
    return (key in this.mapData) ? this.mapData[key] : null;
  };
  this.Reset = function () {
    this.hasError = false;
    this.errorCode = '';
    this.message = '';
    this.returnObject = null;
    this.mapData = null;
  };
}