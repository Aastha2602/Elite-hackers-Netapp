import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import "isomorphic-fetch"

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "30d" }
    );
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. \n" + error });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist." });
    }
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });
    const encryptedPassword = await bcryptjs.hash(password, 12);
    const result = await User.create({
      email: email,
      password: encryptedPassword,
      name: name,
    });
    const token = jwt.sign(
      { name: result.name, email: result.email, id: result._id },
      "test",
      { expiresIn: "30d" }
    );
    res.status(200).json({ result: result, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const otherSignin = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    const token = jwt.sign(
      {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "30d" }
    );
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const otherSignup = async (req, res) => {
  const { email, name } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return otherSignin(req, res);
    }
    const result = await User.create({ email: email, name: name });
    const token = jwt.sign(
      { name: result.name, email: result.email, id: result._id },
      "test",
      { expiresIn: "30d" }
    );
    res.status(200).json({ result: result, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const forgetPassword = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not already exists!" });
    }
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });
    const encryptedPassword = await bcryptjs.hash(password, 12);
    const result = await User.updateOne(
      { _id: existingUser._id },
      { $set: { password: encryptedPassword } },
      { new: true }
    );
    const token = jwt.sign(
      { name: result.name, email: result.email, id: result._id },
      "test",
      { expiresIn: "30d" }
    );
    res.status(200).json({ result: result, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const udemy = async (req, res) => {
    await fetch("https://www.udemy.com/api-2.0/courses/", {
        method: "GET",
        headers: {
          "Accept": "application/json, text/plain, /",
          "Authorization": "Basic M0p4N2RXeW11c1l0N2tHck13OFlQNG85NktNbmpSYUpQQTVSSGxkMzo2d1JCM3JVUkdqZkFZcXVFcGx3TTg1YmxCdE1CZ1M2eXlKY0RKckZWM21HeXFPQUh6cmNUZElpbHp4Z3dwdEh1TFh5YldvVHJjNm5rOXRqRzlVVjM5S3VKaUVvVDh4aUVyN3VNbFkwSmpvY0U0WG1YU0l6OEl5YnBXTm8yNFNCUA==",
          "Content-Type": "application/json;charset=utf-8",
        }
      })
      .then(body=>body.json())
      .then(body=>res.status(200).json(body))
};
