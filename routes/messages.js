const express=require('express')
const router=express.Router();
const controler=require('../controllers/messages');

router.post('/message',controler.saveText);
router.get('/message/list',controler.getText);

module.exports=router;