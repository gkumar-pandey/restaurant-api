const pageNotFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Page not found" });
};

module.exports = pageNotFoundErrorHandler;
