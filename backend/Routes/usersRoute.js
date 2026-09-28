const express=require('express');
const router=express.Router();

const userController=require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/getUsers',authMiddleware,userController.getUsers);
module.exports=router;