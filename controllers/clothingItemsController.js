const ClothingItem = require("../models/clothingItems");
const BadRequestError = require("../middlewares/errors/BadRequestError");
const ConflictError = require("../middlewares/errors/ConflictError");
const ForbiddenError = require("../middlewares/errors/ForbiddenError");
const NotFoundError = require("../middlewares/errors/NotFoundError");
const UnauthorizedError = require("../middlewares/errors/UnauthorizedError");
const ServerError = require("../middlewares/errors/ServerError");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => {
      res.send(clothingItems);
    })
    .catch((err) => {
      console.error(err);
      throw new ServerError("An error has occurred on the server.").catch(next);
    });
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner }).then((item) => {
    console.log(item);
    return res.status(201).send(item);
  })



  .catch(next);


};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const owner = req.user._id;
  ClothingItem.findById(itemId)
    .then((item) => {
      if (String(item.owner) !== owner) {
        throw new ForbiddenError("You are not authorized to delete the item.");
      }
      if (!itemId) {
        throw new NotFoundError("Item not found.");
      }
      return item
        .deleteOne()
        .then(() => res.send({ message: " Item deleted." }));
    })

    .catch(next);
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found.");
    })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console
        .error(err)

        .catch(next);
    });
};
const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found.");
    })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err).catch(next);
    });
};

module.exports = {
  getClothingItems,
  deleteItem,
  createItem,
  likeItem,
  dislikeItem,
};
