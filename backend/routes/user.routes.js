module.exports = (server) => {
  const controller = require("../controllers/user.controller");
  const router = require("express").Router();

  router.get("/", controller.findAll);
  router.post("/", controller.create);

  server.use("/api/users", router);
};
