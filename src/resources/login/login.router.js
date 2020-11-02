const router = require('express').Router();
const loginService = require('./login.service');

const logger = require('../../common/logger');
const morganTokens = require('../../common/morgan-tokens');
const jwt = require('jsonwebtoken');

router.post('/', morganTokens.login, async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await loginService.findUser(login, password);
    if (user) {
      const accessToken = jwt.sign(
        { login: user.login, userId: user._id },
        process.env.JWT_SECRET_KEY
      );

      res.json({
        token: accessToken
      });
    } else {
      res.status(403).send('Username not found');
    }
  } catch (error) {
    logger.error(error.stack);
    res.status(500).send('wrong error');
  }
});

module.exports = router;
