const express=require('express')
const router=express.Router()
const control=require('../controllers/mailers');

router.post('/get-otp',control.getotp);

module.exports=router;