const express=require('express');
const authMiddleware=require('../middleware/auth.middleware')
const accountController=require('../controllers/account.controller')


const router=express.Router()


// POST /api/accounts
// create a new account

router.post( "/",authMiddleware.authMiddleware,accountController.createAccountController)

// GET /api/accounts/balance/:accountId

router.get("/balance/:accountId",authMiddleware.authMiddleware,accountController.getAccountBalanceController)




module.exports=router;



