import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

userSchema.methods.comparePassword = async (
  candidatePassword: string
): Promise<boolean> => {
  const user = this as unknown as UserDocument;

  try {
    const passwordsMatch = await bcrypt.compare(
      candidatePassword,
      user.password
    );
    return passwordsMatch;
  } catch (e) {
    return false;
  }
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
