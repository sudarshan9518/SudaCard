import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"

const NewsLetter = () => {

    const{axios}= useAppContext()
    
    const [email, setemail]= useState()
   


    const emailHandler= async (event)=>{
        try{
               event.preventDefault()

               const{data} = await axios.post('/api/email/email', {
                email
               })

               if(data.success){
                toast.success(data.message)
               }else{
                toast.error(data.message)
               }

        }
        catch(e){
                toast.error(e.message)


        }
    }
       






    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 pb-14">
            <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
            <p className="md:text-lg text-gray-500/70 pb-8">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input onChange={(e)=>setemail(e.target.value)}

                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="text"
                    placeholder="Enter your email id"
                    required
                />
                <button onClick={emailHandler} type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all  cursor-pointer rounded-md rounded-l-none">
                    Subscribe
                </button>
            </form>
        </div>
    )
}


export default NewsLetter