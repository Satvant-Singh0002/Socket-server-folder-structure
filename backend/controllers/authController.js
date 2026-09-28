const db=require('../utils/db-connection');
const Users=require('../models/Users');
const bcrypt=require('bcryptjs');
const { Op } = require('sequelize');
const jwt=require('jsonwebtoken');
const signup=async(req,res)=>{

    try{
        const {name,phone,email,password}=req.body;
        const existingUser = await Users.findOne({where:{email}});
        if(existingUser){
            return res.status(409).json({
                message:'user already exists'
            })
        };
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = await Users.create({
            name,
            phone,
            email,
            password:hashedPassword
        });
        
        res.status(201).json({
            message:'user created successfully'
        })


    }catch(err){
        res.status(500).json({
            message:'internal server error'
        })
        console.log("signup error",err);

    };
    

};
const login = async(req,res)=>{
    try{
        const {login,password}=req.body;
        const user = await Users.findOne({
            where:{
                [Op.or]:[
                    {email:login},
                    {phone:login}
                ]
            }
        });
        if(!user){
            return res.status(404).json({
                message:'user not found'
            })
        }
        const isMatch =await bcrypt.compare(password,user.password);

        if(isMatch){

            const token=jwt.sign(
                {
                    userId:user.id,
                    email:user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"15m"

                }
            );
              res.status(200).json({
            message:'user logged successfully',
            token:token,
            userId:user.id

        });


        }else{
            return res.status(401).json({
                message:'invalid credentials'
            })

        }
    }catch(error){
        res.status(500).json({
            message:'internal server error'
        })
        console.log("login error",error);

    }
    
}
module.exports={
    signup,
    login
}