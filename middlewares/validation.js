const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const router = express.Router();
const { createUser, login } = require("../controllers/usersController");
const {
  deleteItem,
  createItem,
} = require("../controllers/clothingItemsController");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};


const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

const validateSigin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateItem = celebrate({
  headers: Joi.object()
    .keys({ userId: Joi.string().alphanum().length(24).required()})
    .unknown(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

const validateDeleteItem = celebrate({
  headers: Joi.object()
    .keys({ userId: Joi.string().alphanum().length(24).required()})
    .unknown(),
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24).required,
  }),
});
module.export = { validateSignup, validateSigin, validateCreateItem, validateDeleteItem }
