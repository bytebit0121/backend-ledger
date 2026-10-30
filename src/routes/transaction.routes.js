const {Router}=require('express')
const authMiddleware=require('../middleware/auth.middleware')
const transactionController=require('../controllers/transaction.controller');
const { router } = require('../app');

const transactionRoutes=Router();

// POST /api/transactions
// create new transaction
transactionRoutes.post("/",authMiddleware.authMiddleware,transactionController.createTransaction)

// POST /api/transactions
// create initial fund transfer from system user
transactionRoutes.post("/system/initial-funds",authMiddleware.authSystemUserMiddleware,transactionController.createInitialFundsTransaction)



module.exports=transactionRoutes;

