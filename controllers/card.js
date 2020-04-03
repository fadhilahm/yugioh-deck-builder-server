const { Card, Deck } = require("../models");

class CardController {
  static findAll(req, res, next) {
    let { DeckId } = req.body;
    Card.findAll({
      where: {
        DeckId
      }
    })
      .then(found => {
        res.status(200).json({
          msg: "Successfully fetched card data",
          data: found
        });
      })
      .catch(next);
  }

  static create(req, res, next) {
    let { name, image_url, quantity, DeckId } = req.body;
    let isUpdating = false;
    // check whether the DeckId existed or not
    Deck.findOne({
      where: {
        id: DeckId
      }
    })
      .then(found => {
        if (found) {
          // find whether the card already exist yet
          return Card.findOne({
            where: {
              name,
              image_url,
              DeckId
            }
          });
        } else {
          next({ status: 404, msg: "Deck not found" });
        }
      })
      .then(found => {
        if (found) {
          // card already exist add instead
          isUpdating = true;
          return Card.update(
            {
              quantity: Number(quantity) + Number(found.quantity)
            },
            {
              where: {
                id: found.id
              },
              returning: true
            }
          );
        } else {
          // card doesn't exist create
          return Card.create({
            name,
            image_url,
            quantity,
            DeckId
          });
        }
      })
      .then(response => {
        if (isUpdating) {
          res.status(200).json({
            msg: "Successfully updated a card",
            data: {
              id: response[1][0].id,
              name: response[1][0].name,
              image_url: response[1][0].image_url,
              quantity: response[1][0].quantity,
              DeckId: response[1][0].DeckId
            }
          });
        } else {
          res.status(201).json({
            msg: "Successfully added a card",
            data: {
              id: response.id,
              name: response.name,
              image_url: response.image_url,
              quantity: response.quantity,
              DeckId: response.DeckId
            }
          });
        }
      })
      .catch(next);
  }

  static update(req, res, next) {
    let { quantity } = req.body;
    let isDelete = false;
    if (Number(quantity) === 0) {
      isDelete = true;
    }
    // find the card first
    Card.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(found => {
        if (found) {
          if (isDelete) {
            return Card.destroy({
              where: {
                id: req.params.id
              }
            });
          } else {
            return Card.update(
              {
                quantity
              },
              {
                where: {
                  id: req.params.id
                },
                returning: true
              }
            );
          }
        } else {
          next({
            status: 404,
            msg: "Card Not Found"
          });
        }
      })
      .then(response => {
        if (isDelete) {
          res.status(200).json({
            msg: "Successfully deleted a card"
          });
        } else {
          res.status(200).json({
            msg: "Successfully updated a card",
            data: {
              id: response[1][0].id,
              name: response[1][0].name,
              image_url: response[1][0].image_url,
              quantity: response[1][0].quantity,
              DeckId: response[1][0].image_url
            }
          });
        }
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Card.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.status(200).json({
          msg: "Successfully deleted a card"
        });
      })
      .catch(next);
  }
}

module.exports = CardController;
