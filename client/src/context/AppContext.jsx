import {  createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate()
    const [user, setUser]= useState(null);
    const [isSeller, setIsSeller]= useState(null);
    const [showUserLogin, setShowUserLogin]= useState(false);
    const [products, setProducts]= useState([]);
    const [cartItems, setcartItems]= useState({});
    const [searchQuery, setSearchQuery]= useState({}); 

    //fetch seller status
    const fetchSeller = async()=>{
        try{
       const {data} = await axios.get('/api/seller/is-auth')
       if(data.success){
        setIsSeller(true)
       }else{
        setIsSeller(false)
       }
        }
        catch(e){
            setIsSeller(false)

        }
    }

    // total cart amount
    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items)

            if(cartItems[items] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }

        }

        return Math.floor(totalAmount * 100) / 100;   //123.451234 * 100 = 12345  = / 100= 123.45

    }

    // get cart item count
    const getCartCount = ()=>{
        let totalcount =0;
        for(const item in cartItems){
            totalcount += cartItems[item]
        }
        return totalcount;
    }

    // fetch all product
    const fetchProducts = async()=>{
        try{
            const{data} = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }
            else{
                toast.error(data.message)
            }

        }
        catch(e){
                toast.error(e.message)


        }
    }

   // add product to cart
   const addToCart= async(itemID)=>{

    let cartData =  structuredClone(cartItems)

    if(cartData[itemID]){
        cartData[itemID] +=1;
    }
    else{
        cartData[itemID] = 1
    }
    setcartItems(cartData);
    toast.success("Added to cart ")
   }

   // update cart items

   const updateCartItem = (itemID, quantity)=>{
    let cartData= structuredClone(cartItems)
    cartData[itemID] = quantity
    setcartItems(cartData)
    toast.success("Cart Updated")

   }


   // remove product form cart

   const removeFromCart = (itemID)=>{
    let cartData = structuredClone(cartItems)
    if(cartData[itemID]){
        cartData[itemID] -=1

        if(cartData[itemID]===0){
            delete cartData[itemID]
        }
    }
    setcartItems(cartData)
   toast.success("Removed From Cart")

   }


   // fetch user auth status user data and cart item
   const fetchUser= async()=>{
   try{
   const {data} =await axios.get('/api/user/is-auth');
   if(data.success){
    setUser(data.user)
    setcartItems(data.user.cartItems)
   }
   }
   catch(e){
    setUser(null)

   }
   }



    useEffect(()=>{
        fetchProducts()
        fetchSeller()
        fetchUser()
    },[])

    // update databse cartitem
    useEffect(()=>{
       if(!user)return
        const updateCart = async()=>{
            try{
                const{data}= await axios.post('/api/cart/update', {cartItems})
                if(!data.success){
                    toast.error(data.message)
                }
            }catch(e){
                toast.error(e.message)
            }
           
        }
         if(user){
              updateCart()
            }

    },[cartItems])

    const value = {navigate, user,setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartCount , getCartAmount, axios , fetchProducts,setcartItems

    }
    return <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
}

export const useAppContext =()=>{
    return useContext(AppContext)
}