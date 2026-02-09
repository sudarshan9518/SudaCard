
import Order from "../models/Order.js"
import Product from "../models/Product.js"


// place order cod   api/order/cod
export const placeOrderCOD = async (req, res)=>{
    try{

        const{userId, items, address}= req.body

        if(!address || items.length===0){
            return res.json({
                success:false,
                message:"invalid data"
            })
        }

        let amount = await items.reduce(async(acc, item)=>{
            const product = await Product.findById(item.product)

            return (await acc)+ product.offerPrice * item.quantity;
        },0)

        // add tax charge 2%
        amount += Math.floor(amount*0.02)
        await Order.create({
            userId, 
            items, amount, address, paymentType :"COD",

        })
        return res.json({
            success:true,
            message:"order palced successfully"
        })

    }
    catch(e){

        console.log(e.message);
         res.json({
          
                success:false,
                message:e.message  })

    }
}


// get order by user id api/order/user
export const getUserOrders = async(req, res)=>{
    try{
        const{userId} = req.body;

        const orders = await Order.find({userId, 
            $or:[{paymentType:"COD"}, {isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})

        res.json({success:true, orders})



    }
    catch(e){
        res.json({
            successs:false,
            message:e.message
        })

    }
}

// get all orders(for seller/ admin) api/order/seller

export const getAllOrders = async(req, res)=>{
    try{
      

        const orders = await Order.find({ 
            $or:[{paymentType:"COD"}, {isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1})

        res.json({success:true, orders})



    }
    catch(e){
        res.json({
            successs:false,
            message:e.message
        })

    }
}
