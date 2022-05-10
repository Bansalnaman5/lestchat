const express=require('express');
const router=express.Router();
const controller=require('../controllers/user');

router.post('/checkuser',controller.checkUser);
router.post('/user',controller.registerUser);

module.exports=router;