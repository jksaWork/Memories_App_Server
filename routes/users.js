import express from "express";
import UserModal from "../Models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();
import bcrypt from "bcrypt";
// Post Router
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // app.email
  try {
    const user = await UserModal.find({ email });
    if (!user) return res.status(401).json({ message: "no User Provider" });

    // JsonWebTokenError;
    var token = jwt.sign({ user, id: user._id }, "test");
    return res.status(200).json({ token, user });
  } catch (error) {
    const data = {
      status: false,
      message: error.message,
      code: error.code,
      line: error.line,
    };
    console.log(data);
    res.status(419).json(data);

    // return res.json({ message: "Some Thing Went Worng" }, 400);
  }
});
router.post("/register", async (req, res) => {
  const body = req.body;
  // console.log(body);
  const { email } = body;
  let bcreyptdPassword = null;

  try {
    bcrypt.hash(body.password, 12, (hash) => {
      bcreyptdPassword = hash;
    });

    const IsUserExist = await UserModal.find({ email });
    console.log(IsUserExist, "Users -----------------------");
    if (IsUserExist.length > 0)
      return res.json({ message: "User is Alreay Hava Account" }, 419);

    const user = new UserModal({ ...body, password: bcreyptdPassword });

    const data = await user.save();
    var token = jwt.sign({ user: data, id: user._id }, "test");
    console.log(token, data);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error.message);
    const data = {
      status: false,
      message: error.message,
      code: error.code,
      line: error.line,
    };
    console.log(data);
    res.status(419).json({
      status: false,
      message: error.message,
      code: error.code,
      line: error.line,
    });
  }
});
export default router;
