'use strict';

function ReturnValue(parm) {
  this.hasError = parm && parm.hasError ? parm.hasError : false;
  this.errorCode = parm && parm.errorCode ? parm.errorCode : '';
  this.message = parm && parm.message ? parm.message : '';
  this.returnObject = parm && parm.returnObject ? parm.returnObject : null;
  this.mapData = null;
  this.PutValue = function(key, val) {
    if (this.mapData == undefined) {
      this.mapData = new Object();
      this.mapData[key] = val;
    }
  };
  this.GetValue = function(key) {
    return (this.mapData && (key in this.mapData)) ? this.mapData[key] : null;
  };
  this.Reset = function() {
    this.hasError = false;
    this.errorCode = '';
    this.message = '';
    this.returnObject = null;
    this.mapData = null;
  };
}

const KOCReturn = {
  Value: function(parm) {
    return new ReturnValue(parm);
  },
  Promise: async function(func) {
    let retValue = KOCReturn.Value();
    try {
      retValue.returnObject = await func();
    } catch (ex) {
      console.error(ex);
      retValue.hasError = true;
      retValue.message = ex.message;
      retValue.returnObject = ex;
    }
    return retValue;
  },
};

module.exports = KOCReturn;