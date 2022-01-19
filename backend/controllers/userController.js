import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Web3 from "web3";

// const Web3 = require("web3");
// var Accounts = require('web3-eth-accounts');
// var accounts = new Accounts('ws://localhost:8545');

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      accountType: user.accountType,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, accountType } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    // throw new Error("User already exists");
    console.log("user exists");
    return;
  }

  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

  // const { address, privateKey } = web3.eth.accounts.create("Hello World");
  const address = await web3.eth.personal.newAccount("jfkdsjfkdsjfjdljfld");
  console.log(address);
  let privateKey = -1;

  web3.eth.personal.unlockAccount(address, "jfkdsjfkdsjfjdljfld", 999999999999)
    .then(console.log('Account unlocked!'));

  console.log("New User Wallet(address, private key): ", address, ",", privateKey);

  const user = await User.create({
    name,
    email,
    password,
    address,
    accountType,
    privateKey,
  });

  console.log("user created");

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      accountType: user.accountType,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      accountType: user.accountType,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const accountType = async (req, res) => {
  console.log("Fetching Account Type");
  // const user = await User.findById(req.user._id);
  console.log(req.user);
  console.log(req.user.name);
  console.log(req.user.accountType);

  if (req.user.accountType) {
    res.json({accountType: req.user.accountType});
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
};

export { authUser, accountType, updateUserProfile, registerUser };
