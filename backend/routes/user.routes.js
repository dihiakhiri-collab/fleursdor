const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.findAll);
router.post("/", controller.create);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;
