const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send( { error: 'Unknown endpoint' } )
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id in unknown format' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError'){
    return response.status(400).json({ error: 'invalid authorization token' })
  } else {
    console.log('tännekin päädytään', error)
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}