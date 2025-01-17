import { model, Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ["work", "home", "personal"],
      default: "personal",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ContactCollection = model("contacts", contactSchema);

export default ContactCollection;

