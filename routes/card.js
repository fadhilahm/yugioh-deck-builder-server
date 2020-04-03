const router = require("express").Router();
const { CardController } = require("../controllers");
const { cardAuthorize } = require("../middlewares/authorization");

router.post("/", CardController.findAll);
router.post("/create", CardController.create);
router.put("/:id", cardAuthorize,  CardController.update);
router.delete("/:id",  cardAuthorize, CardController.delete);

module.exports = router;
