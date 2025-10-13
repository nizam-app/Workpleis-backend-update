import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { bankAccountServices } from "./bank.services.js";


// add bank account 
const addBankAccountController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
   
  const bankAccount = await bankAccountServices.addBankAccountService(userId,req.body);
   sendResponse(res,{
           statusCode : 201,
           success : true,
           message : 'Bank Account created',
           data : bankAccount
       });
});

// get my bank accounts 
const getMyBankAccountsController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const bankAccounts = await bankAccountServices.getMyBankAccountsService(userId);
   sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Bank Accounts retrived',
           data : bankAccounts
       });
});

// update bank account 
const updateBankAccountController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const bankAccountId = req.params.id;
  const bankAccount = await bankAccountServices.updateBankAccountService(userId,bankAccountId,req.body);
   sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Bank Account Updated',
           data : bankAccount
       });
});

// delete bank account 
const deleteBankAccountController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const bankAccountId = req.params.id;
  await bankAccountServices.deleteBankAccountService(userId,bankAccountId);
   sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Bank Account deleted',
           data : null
       });
});


export const bankAccountControllers = {
    addBankAccountController,
    getMyBankAccountsController,
    updateBankAccountController,
    deleteBankAccountController
}