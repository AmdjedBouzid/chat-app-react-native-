const validate = () => (req, res, next) => {
  try {
    req.user = next();
  } catch (err) {}
  next();
};

module.exports = { validate };
