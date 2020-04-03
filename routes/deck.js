const router = require("express").Router();
const { DeckController } = require("../controllers");
const { deckAuthorize } = require("../middlewares/authorization");

router.get("/", DeckController.findAll);
router.post("/", DeckController.create);
router.put("/:id", deckAuthorize, DeckController.update);
router.delete("/:id", deckAuthorize, DeckController.delete);

module.exports = router;
