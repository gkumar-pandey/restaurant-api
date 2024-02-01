const pageNotFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Route not found" });
};

module.exports = pageNotFoundErrorHandler;
