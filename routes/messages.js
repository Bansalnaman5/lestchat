const express=require('express')
const router=express.Router();
const controler=require('../controllers/messages');

router.post('/message',controler.saveText);
router.get('/message/list',controler.getText);
router.get('/getUser',controler.getUser);
router.post('/updateUser',controler.updateUser);

module.exports=router;
