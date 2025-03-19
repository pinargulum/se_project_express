const { Joi, celebrate } = require("celebrate");
const validator = require("validator");
const { createUser, login } = require("../controllers/usersController");
const { deleteItem, createItem } = require("../controllers/clothingItemsController");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
validateClothingItems = celebrate({
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

validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({}),
  query: Joi.object().keys({}).unknown(true),
});

  router.post(
    "/signup",
    celebrate({
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(2),
        name: Joi.string().required().min(2).max(30),
        avatar: Joi.string().required().custom(validateURL).messages({
          "string.empty": 'The "imageUrl" field must be filled in',
          "string.uri": 'the "imageUrl" field must be a valid url',
        }),
      }),
    }),
    createUser
  );

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
router.post(
  "/items",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
    }),
  }),
  createItem
);

router.delete(
  "/:itemId",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().alphanum().length(24),
    }),
    headers: Joi.object().keys({}),
    query: Joi.object().keys({}).unknown(true),
  }),
  deleteItem
);
