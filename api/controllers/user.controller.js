import User from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";


export default async function updateUserController(req, res, next) {
  console.log(req.params.id, req.user.id);
  if (req.user.id !== req.params.id) {
    return res.status(401).json("You can only update your account");
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          profileImage: req.body.profileImage,
          email: req.body.email,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;

    return res.status(200).json(rest);
  } catch (err) {
    console.log(err);
  }
}
