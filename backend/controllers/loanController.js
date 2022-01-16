import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Loan from "../models/loanModel.js";
import generateToken from "../utils/generateToken.js";
import Web3 from "web3";

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

let admin;
let contract;
web3.eth.getAccounts().then(data => {
  admin = data[0];
  contract = new web3.eth.Contract([
    {
      name: "registerAsset",
      inputs: [
        {
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        }
      ],
      outputs: [
        {
          name: "success",
          type: "bool",
          internalType: "bool",
        }
      ],
      type: "function",
      stateMutability: "nonpayable",
    },
    {
      name: "lenderFound",
      inputs: [
        {
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        }
      ],
      outputs: [
        {
          name: "success",
          type: "bool",
          internalType: "bool",
        }
      ],
      type: "function",
      stateMutability: "nonpayable",
    },
    {
      name: "deadlineEnd",
      inputs: [
        {
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
        {
          internalType: "address",
          name: "_lender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        }
      ],
      outputs: [
        {
          name: "success",
          type: "bool",
          internalType: "bool",
        }
      ],
      type: "function",
      stateMutability: "nonpayable",
    },
    {
      name: "balanceOf",
      inputs: [
        {
          internalType: "address",
          name: "_borrower",
          type: "address",
        },
      ],
      outputs: [
        {
          name: "balance",
          type: "uint256",
          internalType: "uint256",
        }
      ],
      type: "function",
      stateMutability: "nonpayable",
    },
    {
      name: "usdBalanceOf",
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
      ],
      outputs: [
        {
          name: "balance",
          type: "uint256",
          internalType: "uint256",
        }
      ],
      type: "function",
      stateMutability: "nonpayable",
    },
    
  ], '0x1b72c6C3ad990122D095414F45beBA39c761Ed12', {
    from: admin,      
  });
})

// console.log(contract.methods);

export const requestLoan = async (req, res) => {

  const { amount, month, assetName, assetType, assetWorth, assetQuantity } = req.body;

  const loan = await Loan.create({
    name: req.user.name,
    email: req.user.email,
    moneyRequired: amount,
    loanDuration: month.current,
    assetName: assetName,
    assetType: assetType,
    assetWorth: assetWorth,
    assetQuantity: assetQuantity,
  });


  if (loan) {
    const value = assetWorth * assetQuantity;
    const borrower = req.user;

    console.log("----------------------------------------------");
    console.log("--------------Borrower Address----------------");
    console.log(borrower.address);

    await contract.methods.registerAsset(borrower.address, value).send(
      {
        from: admin,
      }
    ).then(console.log);

    console.log('----------Borrower----------')
    const bBalance = await contract.methods.balanceOf(borrower.address).call()
    const bUSD = await contract.methods.usdBalanceOf(borrower.address).call()

    console.log("Borrower Tokens: " + bBalance);
    console.log("Borrower USD: " + bUSD);

    res.status(201).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      moneyRequired: amount,
      loanDuration: month,
      assetName: assetName,
      assetType: assetType,
      assetWorth: assetWorth,
      assetQuantity: assetQuantity,
      token: generateToken(req.user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};

export const getRequests = async (req, res) => {
  const loans = await Loan.find({loanFound: false});
  res.json(loans);
}

export const lendAccept = async (req, res) => {
  const { _id } = req.body;
  const loan = await Loan.findOne({
    _id
  });
  if (loan) {
    loan.loanFound = true;
    let value = loan.assetWorth * loan.assetQuantity;

    const lender = req.user;
    const borrower = await User.findOne({name: loan.name});

    await contract.methods.lenderFound(borrower.address, lender.address, value).send({from: admin}).then(console.log);

    console.log('----------Borrower----------')
    const bBalance = await contract.methods.balanceOf(borrower.address).call()
    const bUSD = await contract.methods.usdBalanceOf(borrower.address).call()

    console.log("Borrower Tokens: " + bBalance);
    console.log("Borrower USD: " + bUSD);

    console.log('----------Lender------------')
    const lBalance = await contract.methods.balanceOf(lender.address).call()
    const lUSD = await contract.methods.usdBalanceOf(lender.address).call()
    
    console.log("Lender Tokens: " + lBalance);
    console.log("Lender USD: " + lUSD);

    await loan.save();
    res.json({
      success: true,
    })
  } else {
    res.status(401);
  }
}

export const fetchBalance = async (req, res) => {
  const tokens = await contract.methods.balanceOf(req.user.address).call();
  const usd = await contract.methods.usdBalanceOf(req.user.address).call();

  res.status(201).json({tokens, usd});
}
