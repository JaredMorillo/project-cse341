const validator = require('../helpers/validate');

const saveBooks = (req, res, next) => {
  const validationRules = {
    genre: 'required|string',
    title: 'required|string',
    author: 'required|string',
    code: 'required|regex:/^[0-9]{3}-[0-9]{3}$/'
  };
   validator(req.body, validationRules, {}, (err, status) => {
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

module.exports = { saveConnection, saveBooks };
