const express = require('express');
const router = express.Router();
const Doctor = require('../../../models/doctor.js');
const { authChecker } = require('../../../middleware/authChecker.js');

router.get('/list', authChecker, async (req, res) => {
  try {
    const findDoctors = await Doctor.find(
      {},
      {
        _id: false,
        doctor_display_name: true,
        doctor_image_url: true,
        hospital_name: true,
        hospital_addr: true,
        description: true,
        hospital_img: true,
      }
    );

    res.status(200).json({ response: { ok: { statusCode: 200, json: { status: 'ok', data: findDoctors } } } });
  } catch (err) {
    return res.status(200).json({
      response: { fail: { statusCode: 200, json: { status: 'nok' } } },
    });
  }
});

router.get('/', authChecker, async (req, res) => {
  try {
    const findDoctors = await Doctor.find({});

    res.status(200).json({ response: { ok: { statusCode: 200, json: { status: 'ok', data: findDoctors } } } });
  } catch (err) {
    return res.status(200).json({
      response: { fail: { statusCode: 200, json: { status: 'nok' } } },
    });
  }
});

module.exports = router;
