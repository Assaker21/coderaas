const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  console.log("Token: " + token);

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("access_token").sendStatus(653);
  }
};

module.exports = authMiddleware;
