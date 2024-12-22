const updateProfileMi = (req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Call next() to pass control to the next middleware or route handler
};
module.exports = updateProfileMi;
