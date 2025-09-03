// routes/userRoutes.js (CommonJS)
const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// /api/users
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;
