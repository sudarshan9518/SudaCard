import {  createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.VITE_CURRENCY

    const navigate = useNavigate()
    const [user, setUser]= useState(null);
    const [isSeller, setIsSeller]= useState(null);
    const [showUserLogin, setShowUserLogin]= useState(false);
    const [products, setProducts]= useState([]);
    const [cartItems, setcartItems]= useState({});
    const [searchQuery, setSearchQuery]= useState({});


    // fetch all product
    const fetchProducts = async()=>{
        setProducts(dummyProducts)
    }

   // add product to cart
   const addToCart=(itemID)=>{
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



    useEffect(()=>{
        fetchProducts()
    },[])

    const value = {navigate, user,setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery

    }
    return <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
}

export const useAppContext =()=>{
    return useContext(AppContext)
}