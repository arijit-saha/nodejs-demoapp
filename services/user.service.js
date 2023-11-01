const User = require("../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const request = req.body;
  const user = await User.findOne({username: request.username});
  if (!user) {
    return res.status(200).send({success: "User not found."});
  }
  if (user.password != request.password) {
    return res.status(401).send({success: "Authentication failure"});
  }
  const token = jwt.sign({username: user.username}, "your_secret_key");
  return res.status(200).send({
    success: "Query succeed.",
    token: token,
  });
};

const register = async (req, res) => {
  try {
    const request = req.body;
    await User.create({
      username: request.username,
      password: request.password,
      name: request.name,
      phone: request.phone,
    });
    return res.status(200).send({
      success: "User registered successfully.",
    });
  } catch (error) {
    return res.status(403).send({
      error: "Something went wrong while registering.",
      result: error,
    });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send({
      success: "Query Succeed.",
      result: users,
    });
  } catch (error) {
    return res.status(403).send({
      error: "Something went wrong while fetching all users.",
      result: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const request = req.body;
    const user = await User.findOneAndUpdate(
      { _id: request._id },
      { phone: request.phone }
    );
    return res.status(200).send({
      success: "User updated.",
      result: user,
    });
  } catch (error) {
    return res.status(403).send({
      error: "Something went wrong while updating user details.",
      result: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const request = req.body;
    const user = await User.findOneAndDelete(
      { _id: request._id }
    );
    if (!user) {
      return res.status(200).send({
        success: "User not found.",
      });
    }
    return res.status(200).send({
      success: "User deleted.",
      result: user,
    });
  } catch (error) {
    return res.status(403).send({
      error: "Something went wrong while deleting user.",
      result: error,
    });
  }
};

module.exports = { login, register, fetchAllUsers, updateUser, deleteUser };