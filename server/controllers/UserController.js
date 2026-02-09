import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// register user /api/user/register
export const register=async(req, res)=>{
    try{
        const {name , email, password}= req.body;

        if(!name || !email || !password){
            return res.json({
                success:false,
                message:"Missing Details"
            })
        }

        const existingUser = await User.findOne({email})

        if(existingUser){
             return res.json({
                success:false,
                message:"User Alrady Exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            name, email, password:hashPassword
        })

        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {
            expiresIn:'7d'
        })

        res.cookie('token', token, {
            httpOnly : true, // prevent js
            secure : process.env.NODE_ENV==='production' ,// secure cookie
            sameSite: process.env.NODE_ENV==='production' ?'none':'strict' ,//csrf protection
            maxAge: 7*24*60*60*1000 
        })

        return res.json({
                success:true,
                user: {email : user.email, name : user.name}
            })

        


    }
    catch(e){
        console.log(e.message);
        
         return res.json({
                success:false,
                message:e.message
            })
        

    }
}

//login user api.user.login
export const login= async(req, res)=>{

    try{
        const {email, password} = req.body
        if(!email, !password){
            return res.json({
                success:false,
                message:"email and password are required"
            })    }

           const user = await User.findOne({email}) 

           if(!user){
             return res.json({
                success:false,
                message:"invalid email and password"
            })
           }

           const isMatch = await bcrypt.compare(password, user.password)

           if(!isMatch){
             return res.json({
                success:false,
                message:"email and password are invalid"
            })
           }


            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {
            expiresIn:'7d'
        })

        res.cookie('token', token, {
            httpOnly : true, // prevent js
            secure : process.env.NODE_ENV==='production' ,// secure cookie
            sameSite: process.env.NODE_ENV==='production' ?'none':'strict' ,//csrf protection
            maxAge: 7*24*60*60*1000 
        })

        return res.json({
                success:true,
                user: {email : user.email, name : user.name}
            })

           


    }
    catch(e){
         console.log(e.message);
        
         return res.json({
                success:false,
                message:e.message
            })
      
    }

}

//check auth api/user/is-auth
export const isAuth= async(req, res)=>{
    try{
        const {userId} =req.body
        const user = await User.findById (userId).select("-password")

      return res.json({
        success : true,
        user

        })

    }
    catch(e){
        console.log(e.message);
        res.json({
            success: false,
            message:e.message
        })
        

    }
}

// logout user api/user/logout

export const logout = async(req, res)=>{
    try{

        res.clearCookie('token', {
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production' ?'none': 'strict',

        })
        return res.json({
            success: true,
            message :"logout"
        })

    }
    catch(e){
   console.log(e.message);
        res.json({
            success: false,
            message:e.message
        })
    }
}