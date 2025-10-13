import { Schema, model } from  "mongoose";

const bankAccountShcema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : [true, "User is required"]
    },
    name : {
        type : String,
        retuired: [true,"Name is required"],
        trim : true
    },
    accountId : {
        type : String,
        required : [true, "Bank Account ID is required"],
        trim : true,
        unique : true
    }
},{
    timestamps : true,
    versionKey : false
});

const BankAccount = model("BankAccount",bankAccountShcema);

export default BankAccount;