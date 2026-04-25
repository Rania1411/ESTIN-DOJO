const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (userData) => {
  const { name, email, password, year } = userData;

  if (!name || !email || !password) {
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    year: year || '1CP',
  });

  if (!user) {
    throw new Error('Invalid user data');
  }

  return {
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    year: user.year,
    token: generateToken(user._id),
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      year: user.year,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

module.exports = {
  registerUser,
  loginUser,
};
