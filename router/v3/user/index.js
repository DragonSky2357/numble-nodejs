const express = require('express');
const router = express.Router();
const User = require('../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authChecker } = require('../../../middleware/authChecker.js');
const { mongoose } = require('mongoose');

const { BCRYPT_SALT, JWT_SECRET_KEY, JWT_ISSUER } = process.env;

// signup
// url : /v3/user/reg
// method : post
// description: "email을 고유 아이디로 새로운 사용자 계정을 생성합니다."
router.post('/reg', async (req, res) => {
  const getUser = req.body;

  try {
    const existUser = await User.findOne({ email: getUser.email });
    if (existUser) {
      return res.status(200).json({
        response: {
          duplicated: {
            statusCode: 200,
            json: {
              status: 'user_duplicate',
            },
          },
        },
      });
    }

    const registerUser = new User(getUser);

    const hashedKey = await bcrypt.hash(registerUser.key, parseInt(BCRYPT_SALT));

    registerUser.key = hashedKey;
    registerUser.save();

    token = jwt.sign({ type: 'JWT', id: registerUser.id }, JWT_SECRET_KEY, {
      expiresIn: '1h',
      issuer: JWT_ISSUER,
    });
  } catch (err) {
    return res.status.json({
      response: { fail: { statusCode: 200, json: { status: 'nok' } } },
    });
  }
  res.cookie('jwt', token);
  res.status(200).json({ response: { sucess: { json: { status: 'ok', data: { token: token } } } } });
});

router.post('/unreg', authChecker, async (req, res) => {
  const getToken = req.headers.authorization.split('Bearer ')[1];

  const decodeToken = jwt.decode(getToken, JWT_SECRET_KEY);
  const userId = mongoose.Types.ObjectId(decodeToken.id);

  try {
    const findUser = await User.findOne({ _id: userId });
    if (!findUser) {
      return res.status.json({
        response: { fail: { statusCode: 200, json: { status: 'nok' } } },
      });
    }
    await User.deleteOne({ _id: userId });
  } catch (err) {
    return res.status.json({
      response: { fail: { statusCode: 200, json: { status: 'nok' } } },
    });
  }
  res.status(200).json({ response: { ok: { statusCode: 200, json: { status: 'ok' } } } });
});

module.exports = router;
