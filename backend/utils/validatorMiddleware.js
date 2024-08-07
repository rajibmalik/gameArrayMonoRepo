const { param, validationResult } = require('express-validator');

// Validate steamid
exports.steamid = [
  param('steamid')
    .isLength({ min: 17, max: 17 })
    .withMessage('Steamid must be exactly 17 characters long')
    .isNumeric()
    .withMessage('Steamid must be a number'),

  // Middleware handling validation results
  (req, res, next) => {
    // Return error if steamid is not valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'fail', errors: errors.array() });
    }
    next();
  },
];
