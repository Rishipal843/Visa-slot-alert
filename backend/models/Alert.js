const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  visaType: {
    type: String,
    enum: ["Tourist", "Business", "Student"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Booked", "Expired"],
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Alert", alertSchema);
