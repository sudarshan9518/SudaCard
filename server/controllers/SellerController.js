import jwt from 'jsonwebtoken'


//seller login api/seller/login
export const sellerLogin = async(req, res)=>{
    const{email, password} = req.body

    try{

         if(password===process.env.SELLER_PASS && email=== process.env.SELLER_EMAIL){

        const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn:'7d'});


 res.cookie('sellerToken', token, {
            httpOnly : true, // prevent js
            secure : process.env.NODE_ENV==='production' ,// secure cookie
            sameSite: process.env.NODE_ENV==='production' ?'none':'strict' ,//csrf protection
            maxAge: 7*24*60*60*1000 
        })

          return res.json({
                success:true,
                message: "loged in "
            })
    }
    else{
         return res.json({
            success:   false,
            message:"invalid message "
         })
    }
    }
    catch(e){
        console.log(e.message);
        return res.json({ message : e.message})
        

    }

   
}

// isauth api/sellerl/is-auth
export const isSellerAuth= async(req, res)=>{
    try{
       return res.json({success:true})

    }
    catch(e){
        console.log(e.message);
        res.json({
            success: false,
            message:e.message
        })
        

    }
}

// logout api/seller/logout
export const sellerlogout = async(req, res)=>{
    try{

        res.clearCookie('sellerToken', {
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


