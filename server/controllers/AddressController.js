import Address from "../models/Address.js"
// add address api/address/add

export const addAddress = async(ewq, res)=>{
    try{

        const {userId} = req
        const {address} = req.body

        await Address.create({...address, userId})
        res.json({success:true, message:"address added successfully"})

    }
    catch(e){
        console.log(e.message);
        res.json({
            success:false,
            message:e.message
        })
        

    }
}

// get address  /api/address/get
export const getAddress = async(ewq, res)=>{

    try{
            const { userId} = req
            const addresses = await Address.find({userId})

             res.json({success:true, addresses})
    }
    catch(e){
     console.log(e.message);
        res.json({
            success:false,
            message:e.message
        })
        
    }

}

