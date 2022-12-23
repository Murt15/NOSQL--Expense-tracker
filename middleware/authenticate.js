const jwt=require('jsonwebtoken');

const User=require('../Models/user');
const mongoDb=require('mongodb')

const authenticate=async (req,res,next)=>{
    try{
        const token=req.header('Authorization');
        //console.log(token);
        const user=jwt.verify(token,process.env.SECRET)
        //console.log(user);
         const user1=await User.find(new mongoDb.ObjectId(user.userId));
         //console.log(user1);
        req.user=user1
        next();
    }catch(err){
        console.log(err);
    }
}
module.exports={authenticate};