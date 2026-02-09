
// update user data api:cart/update

import User from "../models/User.js"

export const updateCart= async()=>{

    try{
        const{userId, cartItems}= req.body
        await User.findByIdAndUpdate(userId, {cartItems})

        res.json({success:true, message:"cart updated"})

    }
    catch(e){
        console.log(e.message);
        res.json({
            success:false,
            message:e.message
        })
        

    }
}