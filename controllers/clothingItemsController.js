const ClothingItem = require("../models/clothingItems");

const {
  SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND,
  FORBIDDEN,
} = require("../utils/constants");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => {
      res.send(clothingItems);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
     return res.status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Please complete all mandatory fields." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const owner = req.user._id;
  ClothingItem.findById(itemId)
    .then((item) => {
      if (String(item.owner) !== owner) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You are not authorized to delete the item." });
      }
      return item
        .deleteOne()
        .then(() => res.send({ message: " Item deleted." }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Please complete all mandatory fields." });
      }
      if (itemId) {
        return res.status(NOT_FOUND).send({ message: "Item not found." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("item not found");
      error.name = "NotFoundError";
      throw error;
    })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "NotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "User information not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Please complete all mandatory fields." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
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
      const error = new Error("item not found");
      error.name = "NotFoundError";
      throw error;
    })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "NotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "User information not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Please complete all mandatory fields." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  getClothingItems,
  deleteItem,
  createItem,
  likeItem,
  dislikeItem,
};
