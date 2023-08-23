'use strict'

class KOCReturn {
  hasError = false
  errorCode = ''
  message = ''
  returnObject = null
  mapData = null

  constructor (parm) {
    parm && parm.hasError && (this.hasError = parm.hasError)
    parm && parm.errorCode && (this.errorCode = parm.errorCode)
    parm && parm.message && (this.message = parm.message)
    parm && parm.returnObject && (this.returnObject = parm.returnObject)
  }

  PutValue (key, val) {
    if (!this.mapData) {
      this.mapData = {}
    }
    this.mapData[key] = val
  }

  GetValue (key) {
    return (this.mapData && (key in this.mapData)) ? this.mapData[key] : null
  }

  Reset () {
    this.hasError = false
    this.errorCode = ''
    this.message = ''
    this.returnObject = null
    this.mapData = null
  }

  static Value (parm) {
    return new KOCReturn(parm)
  }

  static async Promise (func) {
    let retValue = new KOCReturn()
    try {
      retValue.returnObject = await func()
    } catch (ex) {
      retValue.hasError = true
      retValue.message = ex.message
      retValue.returnObject = ex
    }
    return retValue
  }
}

module.exports = KOCReturn
