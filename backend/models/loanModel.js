import mongoose from "mongoose";

const loanSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    moneyRequired: {
      type: Number,
      required: true,
    },
    assetName: {
      type: String,
      required: true,
    },
    assetType: {
      type: String,
      required: true,
    },
    assetWorth: {
      type: Number,
      required: true,
    },
    assetQuantity: {
      type: Number,
      required: true,
    },
    loanDuration: {
      type: Number,
      required: true,
    },
    loanFound: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
