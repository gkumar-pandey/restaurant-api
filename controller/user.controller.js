const User = require("../model/user");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "register successfully", user: newUser });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signup,
};
