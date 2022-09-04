const express = require('express');
const router = express.Router();
const Doctor = require('../../../models/doctor.js');
const jwt = require('jsonwebtoken');
const { authChecker } = require('../../../middleware/authChecker.js');
const { mongoose } = require('mongoose');

router.get('/list', authChecker, async (req, res) => {
  try {
    const findDoctors = await Doctor.find();

    res.status(200).json({ response: { ok: { statusCode: 200, json: { status: 'ok', data: findDoctors } } } });
  } catch (err) {
    return res.status.json({
      response: { fail: { statusCode: 200, json: { status: 'nok' } } },
    });
  }
});

module.exports = router;
