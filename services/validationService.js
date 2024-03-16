const { validationResult } = require('express-validator');

// Validate request body using Express Validator
exports.validateRequestBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validate employee ID parameter
exports.validateEmployeeId = (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid employee ID' });
  }
  next();
};

// Validate salary ID parameter
exports.validateSalaryId = (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid salary ID' });
  }
  next();
};
