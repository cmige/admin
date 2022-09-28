const simpleResponse = (res, code, message, data = null) => {
  res.status(200).send({
    code,
    message,
    data
  })
}


module.exports = {
  simpleResponse
}