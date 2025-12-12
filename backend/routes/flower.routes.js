module.exports = (server) => {
  const controller = require("../controllers/flower.controller");
  const router = require("express").Router();

  router.get("/", controller.findAll);
  router.post("/", controller.create);
  router.get("/:id", controller.findOne);

  server.use("/api/flowers", router);
};
