import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v) => passwordRules.test(v),
        message:
          "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: false,
      validate: {
        validator: (v) => /^[0-9]{11}$/.test(v),
        message: (props) =>
          `${props.value} is not a valid phone number. It must be exactly 11 digits.`,
      },
    },
    imageUrl: {
      type: String,
      trim: true,
      required: false,
      validate: {
        validator: (v) =>
          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
            v
          ),
        message: "Invalid image URL format.",
      },
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
      required: true,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if(this.isModified('password')){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next();
})

export default mongoose.model("user", UserSchema);
