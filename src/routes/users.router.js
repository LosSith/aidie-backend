const { Router } = require("express");
const usersController = require("../controllers/users.controller.js");
const Validator = require("../validation/usersValidation.js");
const router = Router();

router.post(
  "/register",
  Validator.UsersValidation.addValidator,
  usersController.createUser
);
router.post("/login", usersController.postLogin);
router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.get("/:id", usersController.getUserById);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
