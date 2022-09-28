const {recordOperation} = require("./recordOperation")


const addUser = (fn) => {
  return fn.after(async (data) => {
    await recordOperation(data)
  })
}

const modifyUser = (fn) => {
  return fn.after(async (data) => {
    await recordOperation(data)
  })
}


const deleteUser = (fn) => {
  return fn.after(async (data) => {
    await recordOperation(data)
  })
}

module.exports = {
  addUser,
  modifyUser,
  deleteUser
}
