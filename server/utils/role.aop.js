const {recordOperation} = require("./recordOperation")

function addRole(fn) {
  return fn.after(async (data) => {
    await recordOperation(data)
  })()
}

function setRole(fn) {
  return fn.after(async (data) => {
    await recordOperation(data)
  })()
}

function deleteRole(fn) {
  return fn.after(async (data) => {
    await recordOperation(data)
  })()
}

module.exports = {
  addRole,
  setRole,
  deleteRole
}