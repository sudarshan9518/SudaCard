import Email from "../models/Email.js"




export const email= async(req, res)=>{

    try{
        const {email} = req.body

        if(!email){
            return res.json({
                success:false,
                message:"email are required"
            })    }

      const existEmail = await Email.findOne({email})

        if(existEmail){
             return res.json({
                success:false,
                message:"Email Alrady Enter"
            })
        }

           const emailSave = await Email.create({email})
           
              return res.json({
                success:true,
                message: "Thank You "
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