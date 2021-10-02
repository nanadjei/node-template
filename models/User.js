import mongoose from 'mongoose';

import UserSchema from "../database/migrations/create_users_table.js";

UserSchema.statics.allowedValues = (user) => {
  return {
    id: user._id,
    email: user.email,
    emailVerifiedAt: user.emailVerifiedAt,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
  }
}

export default mongoose.model("User", UserSchema);

