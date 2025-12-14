const express = require("express");
const router = express.Router();
const controller = require("../controllers/bouquet.controller");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

//  Tous les utilisateurs connectés
router.get("/", auth, controller.findAll);
router.get("/:id", auth, controller.findOne);

//  ADMIN SEULEMENT
router.post("/", auth, isAdmin, upload.single("image"), controller.create);
router.put("/:id", auth, isAdmin, upload.single("image"), controller.update);
router.delete("/:id", auth, isAdmin, controller.delete);

//  Likes → utilisateurs connectés
router.post("/:id/like", auth, controller.like);
router.get("/:id/likes", auth, controller.likesCount);
router.get("/:id/users", auth, controller.usersLiked);

module.exports = router;
