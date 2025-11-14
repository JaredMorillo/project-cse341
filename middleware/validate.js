const validator = require('../helpers/validate');

const saveConnection = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    city: 'required|string',
    country: 'string',
    instagram: 'string',
    facebook: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    
    next();
  });
};

module.exports = { saveConnection };
