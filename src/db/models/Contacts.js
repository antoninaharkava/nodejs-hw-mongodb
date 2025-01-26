import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    isFavourite: { type: Boolean, default: false },
    contactType: { type: String, enum: ['personal', 'business'], required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Прив'язка до користувача
  },
  { timestamps: true, versionKey: false }
);

export default model('Contact', contactSchema);


