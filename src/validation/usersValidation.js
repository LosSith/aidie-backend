const { header, param, body, validationResult } = require("express-validator");

const addValidator = [
  body("email")
    .notEmpty()
    .withMessage("Please provide your email")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Please provide your password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Za-z]/)
    .withMessage("Password must contain at least one letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  (req, res, next) => {
    const errors = validationResult(req).mapped();
    if (Object.keys(errors).length) {
      const errorMessages = Object.keys(errors).reduce((acc, key) => {
        acc.push({ field: errors[key].path, message: errors[key].msg });
        return acc;
      }, []);
      res.status(400).send({ errors: errorMessages });
    } else {
      next();
    }
  },
];

const UsersValidation = {
  addValidator,
};

module.exports = {
  UsersValidation,
};
