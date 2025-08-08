const mongoose = require("mongoose");

const widgetSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      enum: ["bottom-left", "bottom-right"],
      default: "bottom-right",
    },
    brandLogo: { type: String },
    partnerLogo: { type: String },
    orgId: { type: String, required: true },
    widgetName: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    marginleft: { type: String, default: "30px" },
    brandName: { type: String, default: "Brand" },
    marginright: { type: String, default: "30px" },
    borderRadius: { type: String, default: "24px" },
    marginbottom: { type: String, default: "30px" },
    whatsappNumber: { type: String, required: true },
    preFilledMessage: { type: String, default: "Hi" },
    chatBtnText: { type: String, default: "Start Here" },
    brandSubtitle: { type: String, default: "Sub Title" },
    buttonText: { type: String, default: "Chat with us" },
    disableMobileWidget: { type: Boolean, default: false },
    enabledAnimation: { type: Boolean, default: false },
    chatBackgroundColor: { type: String, default: "#000" },
    buttonBackgroundColor: { type: String, default: "#000" },
    widgetId: { type: String, unique: true, required: true },
    onScreenMessage: { type: String, default: "Hello, how can I help you?" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Widget", widgetSchema);
