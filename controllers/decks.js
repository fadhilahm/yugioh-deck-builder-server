const { Deck } = require("../models");

class DeckController {
  static findAll(req, res, next) {
    Deck.findAll({
      where: {
        UserId: req.decoded.id
      }
    })
      .then(allData => {
        res.status(200).json({
          msg: "Successfully fetched decks",
          data: allData
        });
      })
      .catch(next);
  }

  static create(req, res, next) {
    let { name, UserId } = req.body;
    Deck.create({
      name,
      UserId
    })
      .then(created => {
        res.status(201).json({
          msg: "Successfully created a new deck",
          data: {
            id: created.id,
            name: created.name,
            UserId: created.UserId
          }
        });
      })
      .catch(next);
  }

  static update(req, res, next) {
    let { name } = req.body;
    Deck.update(
      {
        name
      },
      {
        where: {
          id: req.params.id
        },
        returning: true
      }
    )
      .then(updated => {
        res.status(200).json({
          msg: "Successfully updated a deck's name",
          data: {
            id: updated[1][0].id,
            name: updated[1][0].name,
            UserId: updated[1][0].UserId
          }
        });
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Deck.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(()=>{
        res.status(200).json({
            msg : "Successfully deleted a deck"
        })
    })
    .catch(next)
  }
}

module.exports = DeckController;
