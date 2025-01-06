const validate = () => (req, res, next) => {
  try {
    next();
  } catch (err) {}
};

module.exports = { validate };
