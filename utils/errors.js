const errorType = {
  VALIDATION_ERROR: "400",
  UNAUTHORIZED: "401",
  SERVER_ERROR: "500"
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case errorName.VALIDATION_ERROR:
      res.json({
        title: 'Validation failed',
        message: err.message
      })
      break
    case errorName.UNAUTHORIZED:
      res.json({
        title: "Requested resource not found",
        message: err.message
      })
      break
    case errorName.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message
      })
default:
break
  }
}
//module.exports = errorHandler
