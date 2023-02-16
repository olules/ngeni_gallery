import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  imageData: String, // add imageData field
});

// convert image data buffer to base64 string before saving
imageSchema.pre("save", function (next) {
  if (this.img && this.img.data) {
    this.imageData = this.img.data.toString("base64");
  }
  next();
});

export default model("Image", imageSchema);
