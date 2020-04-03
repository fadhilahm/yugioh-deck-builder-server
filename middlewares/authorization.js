const { Deck, Card, User } = require("../models");

module.exports = {
  deckAuthorize(req, res, next) {
    let { id } = req.decoded;
    Deck.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(found => {
        if (found) {
          if (found.UserId === id) {
            next();
          } else {
            next({
              status: 401,
              msg: "You cannot access other people's deck"
            });
          }
        } else {
          next({
            status: 404,
            msg: "Deck not found"
          });
        }
      })
      .catch(() => {
        next({
          status: 401,
          msg: "You cannot access other people's deck"
        });
      });
  },
  cardAuthorize(req, res, next) {
    let { id } = req.decoded;
    // find the card's DeckId
    Card.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(found => {
        if (found) {
          // search the decks
          return Deck.findOne({
            where: {
              id: found.DeckId
            }
          });
        } else {
          next({
            status: 404,
            msg: "Card not found"
          });
        }
      })
      .then(found => {
        if (found) {
          // check for user id
          if (found.UserId === id) {
            next();
          } else {
            next({
              status: 401,
              msg: "You cannot access other people's card"
            });
          }
        } else {
          next({
            status: 404,
            msg: "Deck not found"
          });
        }
      })
      .catch(next);
  }
};
