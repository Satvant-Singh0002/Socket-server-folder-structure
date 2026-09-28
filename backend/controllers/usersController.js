const  Users=require('../models/Users');
const { Op } = require('sequelize');
const getUsers=async(req,res)=>{
    try {
        const logedInUser=req.user.userId;

        const users=await Users.findAll({
            where:{
                id:{
                    [Op.ne]:logedInUser
                }
            },
            attributes:['id','name','email']
        });
        res.status(200).json({
            success:true,
            users
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"unable to fetch users"
        });
        
    }

}
module.exports={
    getUsers
}