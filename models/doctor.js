const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    doctor_id: { type: String, require: true },
    available_hours: { type: String, require: true },
    available_weekday: { type: String, require: true },
    description: { type: String, require: true },
    doctor_display_name: { type: String, require: true },
    doctor_image_url: { type: String, require: true },
    doctor_images: { type: Array, require: true },
    doctor_tel: { type: String, require: true },
    hospital_addr: { type: String, require: true },
    hostpital_name: { type: String, require: true },
    hospital_img: { type: String, require: true },
    lab_addr: { type: String, require: true },
    lab_name: { type: String, require: true },
    lab_postal_code: { type: String, require: true },
    lab_receiver_name: { type: String, require: true },
    lab_tel: { type: String, require: true },
    lat: { type: String, require: true },
    lng: { type: String, require: true },
    professional_statement: { type: String, require: true },
    subject: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('doctor', doctorSchema);
