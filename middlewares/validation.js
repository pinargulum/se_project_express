const { Joi, celebrate } = require('celebrate');
const validator = require('validator');





const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

imageUrl: Joi.string().required().custom(validateURL).messages({
  'string.empty': 'The "imageUrl" field must be filled in',
  'string.uri': 'the "imageUrl" field must be a valid url',
}),
const { celebrate, Joi } = require('celebrate');

router.post('/posts', celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
  }),
}), createPost);
const { celebrate, Joi } = require('celebrate');

router.delete('/:postId', celebrate({
  // validate parameters
  params: Joi.object().keys({
    postId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    // validate headers
  }),
  query: Joi.object().keys({
    // validate query
  }).unknown(true),
}), deletePost);