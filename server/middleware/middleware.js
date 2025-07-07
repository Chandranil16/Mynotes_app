const jwt = require("jsonwebtoken");
const User = require("../models/User");

const middleware = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({ message: "Access denied" });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "no user" });
    }
    req.user = { name: user.name, _id: user._id };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "jwt expired" });
    }
    console.error(error);
    res.status(500).json({ message: "please login" });
  }
};

module.exports = middleware;