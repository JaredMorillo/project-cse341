
const isAuthenticated = (req, res, next) => {
  if (!req.session?.user) {
    return res.status(401).json({ error: "You don't have access." });
  }
  next();
};

module.exports = { isAuthenticated };
