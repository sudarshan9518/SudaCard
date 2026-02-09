
import jwt from 'jsonwebtoken'


const authUser = async(req, res, next)=>{
        const {token} = req.cookies;

        if(!token){
          return  res.json({
                success: false,
                message :"Not a Authorized"
            })
        }
        try{
            const tokenDecode= jwt.verify(token, process.env.SECRET_KEY)

            if(tokenDecode.id){
                req.body.userId = tokenDecode.id
            }else{
                return  res.json({
                success: false,
                message :"Not a Authorized"
            })
            }
            next()

        }
        catch(e){
            console.log(e.message);
            
             return  res.json({
                success: false,
                message :e.message
            })

        }

}



export default authUser;