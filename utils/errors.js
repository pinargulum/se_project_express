const errors = {
  ValidationError: 400,
  NotFound: 404,
  ServerError: 500

}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  switch (statusCode) {
    case errors.ValidationError:
      res.json({
        title: 'Validation failed',
        message: err.message
      })
      break
    case errors.NotFound:
      res.json({
        title: 'Requested resource not found',
        message: err.message
      })
      break
    case errors.ServerError:
      res.json({
        title: 'Server Error',
        message: err.message
      })
    default:
      break
  }
}
module.exports = errorHandler
