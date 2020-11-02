const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, err => {
      if (err) {
        return res.sendStatus(401);
      }

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
