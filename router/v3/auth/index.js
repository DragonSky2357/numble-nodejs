const express = require('express');
const router = express.Router();
const User = require('../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY, JWT_ISSUER } = process.env;

// login
// url : /v3/auth/login
// method : post
// TODO: 사용자의 유니크한 id를 JWT token으로 만들어서 내려줘야 합니다.
router.post('/login', async (req, res) => {
  const getUser = req.body;

  try {
    const existUser = await User.findOne({ email: getUser.email });
    if (!existUser) {
      return res.status(200).json({
        response: {
          nouser: {
            statusCode: 200,
            json: {
              status: 'no_user',
            },
          },
        },
      });
    }

    const match = await bcrypt.compare(getUser.key, existUser.key);

    if (!match) {
      return res.status(200).json({
        response: {
          fail: {
            statusCode: 200,
            json: {
              status: 'nok',
            },
          },
        },
      });
    }

    token = jwt.sign({ type: 'JWT', id: existUser.id }, JWT_SECRET_KEY, {
      expiresIn: '1h',
      issuer: JWT_ISSUER,
    });
  } catch (err) {
    return res.status(200).json({
      response: { fail: { statusCode: 200, json: { status: 'nok' } } },
    });
  }
  res.cookie('jwt', token);
  res.status(200).json({ response: { success: { statusCode: 200, json: { status: 'ok', token: token } } } });
});

module.exports = router;
