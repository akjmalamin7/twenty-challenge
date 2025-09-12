const {
  createUser,
  login,
} = require("../controllers/userController.js/userController");

const router = require("express").Router();
router.get("/test", (req, res) => {
  return res.status(200).json({ message: "Hello test" });
});
router.post("/registration", createUser);
router.post("/login", login);
module.exports = router;
