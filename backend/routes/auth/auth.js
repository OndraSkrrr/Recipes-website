const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    return res.redirect("/");
  }
}

module.exports = authMiddleware;