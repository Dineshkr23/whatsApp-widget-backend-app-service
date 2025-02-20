const express = require("express");
const Widget = require("../models/widget");

const router = express.Router();

// Get widget settings by orgId
router.get("/org/:orgId", async (req, res) => {
  try {
    const widgets = await Widget.find({ orgId: req.params.orgId });
    res.json(widgets);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get widget settings by widgetId
router.get("/:widgetId", async (req, res) => {
  try {
    const widget = await Widget.findOne({ widgetId: req.params.widgetId });
    if (!widget) return res.status(404).json({ error: "Widget not found" });
    res.json(widget);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update or create widget settings (Admin Panel will call this)
router.put("/:widgetId", async (req, res) => {
  try {
    const { widgetId } = req.params;
    if (!widgetId) {
      return res.status(400).json({ error: "widgetId is required" });
    }

    const updatedWidget = await Widget.findOneAndUpdate(
      { widgetId },
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!updatedWidget) {
      return res.status(404).json({ error: "Widget not found after update" });
    }

    res.json(updatedWidget);
  } catch (error) {
    console.error("❌ Error updating widget:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

module.exports = router;
