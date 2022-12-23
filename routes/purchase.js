const express=require('express');

const userAuthentication=require('../middleware/authenticate')

const purchaseController=require('../Controller/purchase')

const router=express.Router();

router.get('/premiumMembership',userAuthentication.authenticate,purchaseController.getPremium)

router.post('/transactionstatus',userAuthentication.authenticate,purchaseController.postTransactionStatus);

router.get('/getLeaderboard',purchaseController.getLeaderBoard);

router.post('/expense',purchaseController.getExpense);

router.get('/all-expense/:items',userAuthentication.authenticate,purchaseController.getAllexpense)


module.exports=router;