const express = require("express");
const Widget = require("../models/widget");
const generateUniqueId = require("../utils/generateUniqueId");

const router = express.Router();

// Get widget settings by orgId
router.get("/org/:orgId", async (req, res) => {
  try {
    const widgets = await Widget.find({ orgId: req.params.orgId });
    res.json(widgets);
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error?.message });
  }
});

// Get widget settings by widgetId
router.get("/:widgetId", async (req, res) => {
  try {
    const widget = await Widget.findOne({ widgetId: req.params.widgetId });
    if (!widget) return res.status(404).json({ message: "Widget not found" });
    res.json(widget);
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error?.message });
  }
});

// Update or create widget settings (Admin Panel will call this)
router.put("/create-update-widget", async (req, res) => {
  try {
    const { orgId, widgetId } = req.query;
    const { whatsappNumber, brandLogo } = req.body;
    if (!orgId || !whatsappNumber || !brandLogo) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let updatedWidget;

    if (widgetId) {
      // Update existing widget
      updatedWidget = await Widget.findOneAndUpdate(
        { widgetId },
        { $set: req.body },
        { new: true }
      );

      if (!updatedWidget) {
        return res.status(404).json({ message: "Widget not found" });
      }
    } else {
      // Create new widget
      const uniqueWidgetId = generateUniqueId();
      updatedWidget = await Widget.create({
        widgetId: uniqueWidgetId,
        orgId,
        whatsappNumber,
        brandLogo,
        ...req.body,
      });
    }

    res.json(updatedWidget);
  } catch (error) {
    console.error("❌ Error updating widget:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

module.exports = router;
