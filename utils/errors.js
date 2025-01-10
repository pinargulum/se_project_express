export const ValidationError = () => {
  if ((res.statusCode = 400)) {
    res.status(400).send({ message: 'Validation failed' })
  }
}

export const NotFound = 404
export const ServerError = 500

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

if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
  res.status(400).send({ message: "please enter valid user id" });
    }
//module.exports = errorHandler
