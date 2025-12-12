const express = require("express");
const router = express.Router();
const controller = require("../controllers/bouquet.controller");
const upload = require("../middleware/upload"); // multer

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);

router.post("/", upload.single("image"), controller.create);
router.put("/:id", upload.single("image"), controller.update);

router.delete("/:id", controller.delete);

// likes
router.post("/:id/like", controller.like);
router.get("/:id/likes", controller.likesCount);
router.get("/:id/users", controller.usersLiked);

module.exports = router;
