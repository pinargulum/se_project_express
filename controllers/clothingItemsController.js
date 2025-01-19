const clothingItems = require("../models/clothingItems");
const ClothingItem = require("../models/clothingItems");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const {
  SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND,
} = require("../utils/constants");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => {
      res.status(200).send(clothingItems);
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
      res.status(201).send(item);
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

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("item not found");
      error.name = "NotFoundError";
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== owner.toString()) {
        return res
          .status(403)
          .send({ message: "You are not authorized to delete this item" });
      }
      res.status(200).send(item);
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

const likeItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("item not found");
      error.name = "NotFoundError";
      throw error;
    })
    .then((item) => {
      res.status(200).send({ data: item });
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
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("item not found");
      error.name = "NotFoundError";
      throw error;
    })
    .then((item) => {
      res.status(200).send(item);
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
  getItems,
  deleteItem,
  createItem,
  likeItem,
  dislikeItem,
};
