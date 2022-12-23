const express=require('express');

const userController=require('../Controller/user')

const router=express.Router();

router.post('/signup',userController.postAddUser)

router.post('/login',userController.postLoginUser)

router.post('/forgotpassword',userController.ForgotPassword);

router.get('/resetpassword/:id',userController.resetPassword);

router.get('/updatePassword/:rid',userController.updatePassword);

module.exports=router;