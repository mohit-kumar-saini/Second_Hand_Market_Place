// middleware/auth.js

module.exports = function (req, res, next) {
  console.log("🔍 Request received:", req.method, req.path);
  next();
};
