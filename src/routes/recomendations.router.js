const { Router } = require("express");

const recomendationsController = require("../controllers/recomendations.controller.js");

const router = Router();

router.get("/", recomendationsController.getRecomendations);

module.exports = router;