import crypto from "crypto";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";

// Function to create and send JWT token
const createSendToken = async (user, statusCode, res) => {
  const accessToken = await promisify(jwt.sign)(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.status(statusCode).json({
    status: "success",
    data: {
      user,
      accessToken,
    },
  });
};

// Signup controller
export const signup = expressAsyncHandler(async (req, res, next) => {
  const { username, password, phoneNumber, role, email } = req.body;

  // Check if user already exists with the given username and email
  const existedUser = await User.findOne({
    username: username,
    email: email,
  });

  if (existedUser) {
    return next(
      new AppError("User with this username and email already exists", 409),
      console.log("User with this username and email already exists")
    );
  }

  const newUser = await User.create({
    username,
    password,
    phoneNumber,
    role,
    email,
  });

  // Send the new user and accessToken to the frontend
  createSendToken(newUser, 201, res);
});

export const login = expressAsyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  // 1) Check if email and password exist
  if (!username || !password) {
    return next(new AppError("Please provide username, password", 400));
  }

  // Find the user by username, and explicitly select all fields including password
  const user = await User.findOne({ username }).select("+password");
  // .populate("company");
  //    .populate("esgReport");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect username or password", 401));
  }

  req.user = user;
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

export const protect = expressAsyncHandler(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    console.log("Authorization header is missing or incorrectly formatted");
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  console.log(req.user);
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

export const forgotPassword = expressAsyncHandler(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();

  // Continued from previous part...

  await user.save({ validateBeforeSave: false }); // Save user data even if validation is disabled

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

export const resetPassword = expressAsyncHandler(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

export const updatePassword = expressAsyncHandler(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  console.log(user);

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
