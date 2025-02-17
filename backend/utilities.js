// Dependency Inversion Principle: This utility depends on the abstraction of token verification rather than concrete implementations.
const jwt = require("jsonwebtoken");

// Single Responsibility Principle: Middleware function that verifies the JWT token.
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
