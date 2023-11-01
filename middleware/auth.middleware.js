const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const Authorize = async (req, res, next) => {
  try {
    const rawToken = req.headers.authorization;
    if (!rawToken) {
      return res.status(401).send({ success: "Please login." });
    }
    const token = rawToken.split(' ')[1];
    const decode = jwt.verify(token, "your_secret_key");
    if (decode) {
      const username = decode.username;
      const user = await User.findOne({ username: username });
      if (!user) {
        return res
          .status(401)
          .send({ success: "No account found. Please contact admin." });
      }
      next();
    }
  } catch (error) {
    return res.status(200).send({success: "Invalid token"});
  }
};

module.exports = { Authorize };