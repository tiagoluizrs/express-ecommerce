const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");

authCtrl = new AuthController();
userCtrl = new UserController();

router.post("/recovery", async (req, res) => {
  const result = await authCtrl.recoveryPassword(req.body.email);
  res.statusCode = result.status;
  res.send(result.result);
});

router.post("/confirm-recovery/", async(req, res) => {
  const result = await authCtrl.updatePassword(req.body.token, req.body.newPassword);
  res.statusCode = result.status;
  res.send(result.result);
});

router.post("/login", async (req, res) => {
  const result = await authCtrl.login(req.body.userEmail, req.body.password);
  res.statusCode = result.status;
  res.send(result.result);
});

router.post("/register", async (req, res) => {
  const result = await userCtrl.createUser(req.body);
  res.statusCode = result.status;
  res.send(result.result);
})

router.post("/valida-email", async (req, res) => {
  const result = await authCtrl.validateEmail(req.body.token);
  res.statusCode = result.status;
  res.send(result.result);
});

module.exports = router;
