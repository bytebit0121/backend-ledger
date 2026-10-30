const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    require: [true, "transaction must be associated with FROM account"],
    index: true,
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "account",
    require: [true, "transaction must be associated with TO account"],
    index: true,
  },
  status: {
    type: String,
    enum: {
      values: ["PENDING", "COMPLETED","FAILED","REVERSED"],
      message: "status can be one of PENDING,COMPLETED,FAILED,REVERSED",
    },
    default: "PENDING",
  },
  amount: {
    type: Number,
    require: [true,"Amount req for creating transaction"],
    min:[0,"Transaction amount cannot be neagtive"],
  },
  idempotencyKey:{
    type:String,
    required: [true,"idempotencyKey is required for creating transaction"],
    index: true,
    unique: true,
  }

},{
    timestamps: true
});

const transactionModel=mongoose.model("transaction",transactionSchema)
module.exports=transactionModel;
