const User = require('../models/userModel');


const createUser = async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    console.log(req.params)
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login  = async (req,res) => {
  const { email, password } = req.body;
  console.log("login..............")


  let user;
  if(email) {
       user = await User.findOne({ email });
  }

  if(!user) {
      throw new Error('Invalid email');
  }
  res.status(200).json(user);

  
}

const updateUser = async (req, res) => {
  try {
    const { username, email, password, profilePicture, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password, profilePicture, bio },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login
};
