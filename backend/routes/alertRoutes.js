const express = require("express");
const Alert = require("../models/Alert");

const router = express.Router();

// GET /alerts 
router.get("/", async (req, res, next) => {
  try {
    const { country, status } = req.query;
    let query = {};

    if (country) query.country = country;
    if (status) query.status = status;

    const alerts = await Alert.find(query);
    res.status(200).json(alerts);
  } catch (err) {
    next(err);
  }
});

// POST /alerts
router.post("/", async (req, res, next) => {
  try {
    const { country, city, visaType } = req.body;

    if (!country || !city || !visaType) {
      return res.status(400).json({ message: "All fields required" });
    }

    const alert = await Alert.create({ country, city, visaType });
    res.status(201).json(alert);
  } catch (err) {
    next(err);
  }
});

// PUT /alerts/:id
router.put("/:id", async (req, res, next) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ message: "Alert not found" });

    alert.status = req.body.status || alert.status;
    await alert.save();

    res.json(alert);
  } catch (err) {
    next(err);
  }
});

// DELETE /alerts/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ message: "Alert not found" });

    await alert.deleteOne();
    res.json({ message: "Alert deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
