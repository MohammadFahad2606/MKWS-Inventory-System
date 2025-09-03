// utils/generateToken.js (CommonJS)
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "3h" });
};

module.exports = { generateToken };
