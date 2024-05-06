import User from "../models/users.model.js";
import bcryptjs from "bcryptjs";

export const SignupController = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const user = new User({ username, email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).json({ message: "New User created " + user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
