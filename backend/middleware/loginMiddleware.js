const { z } = require("zod");

const validate = () => (req, res, next) => {
  try {
    req.validatedBody = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { validate };
