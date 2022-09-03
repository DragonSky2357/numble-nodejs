const jwt = require('jsonwebtoken');

const authChecker = (req, res, next) => {
  if (req.headers.authorization) {
    const getToken = req.headers.authorization.split('Bearer ')[1];

    jwt.verify(getToken, process.env.JWT_SECRET_KEY, (err) => {
      if (err) {
        res.status(401).json({ error: 'Auth Error from authChecker' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Auth Error from authChecker' });
  }
};

module.exports = { authChecker };
