module.exports = (server) => {
  const controller = require("../controllers/flower.controller");
  const router = require("express").Router();
  const auth = require("../middleware/auth");

  router.get("/", auth, controller.findAll);
   router.get("/:id", auth, controller.findOne);
  router.post("/", controller.create);
 

  server.use("/api/flowers", router);
};
