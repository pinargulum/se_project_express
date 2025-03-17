const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const { createUser } = require('../controllers/usersController');





const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

router.post('/users', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    age: Joi.number().integer().required().min(18),
    about: Joi.string().min(2).max(30),
  })
}), createUser);

router.post('/items', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'the "imageUrl" field must be a valid url',
    }),
  }),
}), createItems);

router.delete('/:itemId', celebrate({
  // validate parameters
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    // validate headers
  }),
  query: Joi.object().keys({
    // validate query
  }).unknown(true),
}), deletePost);