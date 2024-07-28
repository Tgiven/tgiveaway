import mongoose from "mongoose";

const trackingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: "pending",
    },
    comment: {
      type: String,
      required: false,
    },
    tn: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tracking = mongoose.model("tracking", trackingSchema);

export default Tracking;
