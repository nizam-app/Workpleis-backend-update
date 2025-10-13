import AppError from "../../utils/appError.js";
import BankAccount from "./bank.model.js";



// add bank account 
const addBankAccountService = async (userId,payload) => {
  const {name, accountId} = payload;
  const bankAccount = await BankAccount.create({
    user : userId,
    name,
    accountId
  });
  return bankAccount;
}

// get my bank accounts 
const getMyBankAccountsService = async (userId) => {

    const bankAccounts = await BankAccount.find({
        user : userId
    });

  return bankAccounts;
}

// update bank account 
const updateBankAccountService = async (userId,bankAccountId,payload) => {

    const isBankAccount = await BankAccount.findOne({
        _id : bankAccountId,
        user : userId
    });

    if(!isBankAccount){
        throw new AppError(404, "Bank Account not found");
    }

  const bankAccount = await BankAccount.findByIdAndUpdate(
    bankAccountId,payload,{new : true, runValidators : true}
);

  return bankAccount;
}

// delete bank account 
const deleteBankAccountService = async (userId,bankAccountId) => {

    const isBankAccount = await BankAccount.findOne({
        _id : bankAccountId,
        user : userId
    });
    
    if(!isBankAccount){
        throw new AppError(404, "Bank Account not found");
    }

  await BankAccount.findByIdAndDelete(
    bankAccountId
);

}


export const bankAccountServices = {
    addBankAccountService,
    getMyBankAccountsService,
    updateBankAccountService,
    deleteBankAccountService
}