const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    heartbeat: Number,
    spo2: Number,
    ecg: [Number],

}, { timestamps: true });

module.exports = mongoose.model("patients", patientSchema);

