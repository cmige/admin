Function.prototype.before = function (beforeFn) {
  const _self = this
  return async function () {
    try {
      await beforeFn.apply(_self, arguments)
    } catch (e) {
      return
    }
    return _self.apply(_self, arguments)
  }
}

Function.prototype.after = function (afterFn) {
  const _self = this
  return async function () {
    try {
      const result = await _self.call(_self, arguments)
      await afterFn.call(_self, result)
    } catch (e) {

    }
  }
}

