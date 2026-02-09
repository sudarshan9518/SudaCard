import jwt from 'jsonwebtoken'


const authSeller = async(req, res, next)=>{
        const {sellerToken}= req.cookies;

        if(!sellerToken){
            return res.json({
                success:false,
                message:"Not Authorized "
            })
        }

        try{
                    const tokenDecode= jwt.verify(sellerToken, process.env.SECRET_KEY)
        
                    if(tokenDecode.email ===process.env.SELLER_EMAIL){
                       next()
                    }else{
                        return  res.json({
                        success: false,
                        message :"Not a Authorized"
                    })
                    }
                   
        
                }
                catch(e){
                    console.log(e.message);
                    
                     return  res.json({
                        success: false,
                        message :e.message
                    })
        
                }
}


export default authSeller