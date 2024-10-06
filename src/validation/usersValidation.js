const { header, param, body, validationResult } = require("express-validator");

const addValidator = [
  body("email")
    .notEmpty()
    .withMessage("Agrega Tu email")
    .isEmail()
    .withMessage("Formato Incorrecto"),

  body("password")
    .notEmpty()
    .withMessage("Agrega tu contraseña")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Za-z]/)
    .withMessage("La contraseña debe contener al menos una letra")
    .matches(/\d/)
    .withMessage("La contraseña debe contener al menos un número"),

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
