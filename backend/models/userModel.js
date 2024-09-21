// userModel.js
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
      select: false,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (v) {
          // Validator for phone number to ensure it contains only digits and is 10 digits long
          return /^\d{10}$/.test(v); // Regular expression for a 10-digit phone number
        },
        message: (props) =>
          `${props.value} is not a valid phone number! It should be 10 digits.`,
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["SuperUser", "Admin", "Employee", "Supplier"],
      required: true,
      trim: true,
    },
    ownPassword: {
      type: Boolean,
      default: false,
      validate: {
        validator: function () {
          // Validate that ownPassword is only set for "Admin", "Employee", or "Supplier"
          return ["Admin", "Employee", "Supplier"].includes(this.role);
        },
        message:
          "ownPassword can only be set for Admin, Employee, or Supplier roles.",
      },
    },
    allData: {
      type: Boolean,
      default: false,
      validate: {
        validator: function () {
          // Validate that allData is only set for "Admin", "Employee", or "Supplier"
          return ["Admin", "Employee", "Supplier"].includes(this.role);
        },
        message:
          "allData can only be set for Admin, Employee, or Supplier roles.",
      },
    },
    photo: {
      type: String,
      trim: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
    permissions: {
      type: [String], // Permissions as an array of strings
      default: [], // Default to an empty array
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing and token generation methods remain the same
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre(/^find/, function (next) {
  // If the role is Admin or Employee, populate the company field
  if (["Admin", "Employee"].includes(this.role)) {
    this.populate({
      path: "company",
      select: "supplierESGScore companyID", // Select any fields you want to populate, modify as needed
    });
  }

  // If the role is Supplier, populate the supplier field
  if (this.role === "Supplier") {
    this.populate({
      path: "supplier",
      select: "ESGScore", // Select any fields you want to populate, modify as needed
    });
  }
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
