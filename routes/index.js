const router = require("express").Router();
const userRouter = require("./user");
const deckRouter = require("./deck");
const cardRouter = require("./card");
const { authentification } = require("../middlewares/authentification");

router.use("/", userRouter);
router.use(authentification);
router.use("/decks", deckRouter);
router.use("/cards", cardRouter);

module.exports = router;
