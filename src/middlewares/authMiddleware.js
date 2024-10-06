require("dotenv").config();
const jwt = require("jsonwebtoken");
const usersService = require("../services/users.service.js");

const authMiddleware = async (req, res, next) => {
  try {

    const excludedPaths = ['/login', '/register'];

    if (excludedPaths.includes(req.path)) {
      return next();
    }

    const Authorization = req.header("Authorization");

    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    const token = Authorization.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, "JWT");

    const user = await usersService.getUserByEmail(decoded.user.email);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      birthdate: user.birthdate,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  authMiddleware,
};