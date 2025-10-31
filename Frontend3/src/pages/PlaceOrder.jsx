import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import razorpay from "../assets/razorpay.png"
import { shopDataContext } from '../Context/ShopContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {

    let [method, setMethod]=useState('COD')

    let navigate=useNavigate()

    let {serverUrl}=useContext(authDataContext)

    let [formData,setFormData]=useState({
       firstName:'',
       lastName:'',
       email:'',
       street:'',
       city:'',
       state:'',
       pinCode:'',
       country:'',
       phone:'' 
    })

    let {cartItem,getCartAmount,delivery_fee,products,setCartItem}=useContext(shopDataContext)
  
    const onChangeHandler=(e)=>{
      const name=e.target.name;
      const value=e.target.value;

      setFormData(data=>({...data,[name]:value}))


    }




      const onSubmitHandler=async(e)=>{
         e.preventDefault()
         try{
            let orderItems=[]

   for(const items in cartItem){
     for(const item in cartItem[items]){
      if(cartItem[items][item]>0){

  /*.find() searches the array

Returns only one object — the first that matches the condition .itemInfo makes a deep copy of that single product object

Now you can modify it (size, quantity) without affecting the original products array*/      
         const itemInfo=structuredClone(products.find(product=>product._id===items))
       if(itemInfo){
         itemInfo.size=item

         itemInfo.quantity=cartItem[items][item]


    {/*You get multiple itemInfo objects in orderItems when the user selects multiple products/sizes.

But each itemInfo inside the loop is always one single product object, not an array.

The loop pushes them into an array (orderItems) so that multiple selections are stored together. */}     
         orderItems.push(itemInfo)
       }  
      }
     } 
   }
   

{/*It’s basically a “package” of:
1)Where to deliver (address)
2)What to deliver (items)
3)How much to charge (amount) */}
     let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount()+delivery_fee

     } 

    switch(method){
      case 'COD':
         const result=await axios.post(serverUrl + "/api/order/placeorder" ,orderData,{withCredentials:true}  )

         console.log("Order placed",result.data)

         if(result.data){
            setCartItem({})
            navigate('/order')
         }else{
            console.log(result.data.message)
         }

         break;


      default:
         break;   
    } 

         }catch(error)
         {
          console.log("placeOrder data error ❌", error.response?.data || error.message)
         }
      }    


  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-t from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative mt-[70px] pb-[150px]'>

     <div className='lg:w-[50%] w-[100%] flex items-center justify-center lg:mt-[0px] mt-[100px] '>

      <form  className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]' onSubmit={onSubmitHandler}>
         
         <div className='py-[10px]'>

            <Title text1={"DELIVERY"} text2={"INFORMATION"} />

         </div>
  {/*First name and last name */}
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

         <input type='text' placeholder='First Name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required 
         onChange={onChangeHandler} name='firstName' value={formData.firstName}  />



         <input type='text' placeholder='Last Name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required
         onChange={onChangeHandler} name='lastName' value={formData.lastName}         
         />



            </div> 

  {/*Email input */}
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

         <input type='email' placeholder='Email' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required
         onChange={onChangeHandler} name='email' value={formData.email}          />

        </div> 

  {/*Street input */}
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

         <input type='text' placeholder='Street' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required
         onChange={onChangeHandler} name='street' value={formData.street}          />

        </div> 


  {/*City and State input */}
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

         <input type='text' placeholder='City' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required
         onChange={onChangeHandler} name='city' value={formData.city}          />



         <input type='text' placeholder='State' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required 
         onChange={onChangeHandler} name='state' value={formData.state}         />



            </div>


  {/*Pincode and Country input */}
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

         <input type='text' placeholder='Pincode' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required
         onChange={onChangeHandler} name='pinCode' value={formData.pinCode}          />



         <input type='text' placeholder='Country' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required
         onChange={onChangeHandler} name='country' value={formData.country}          />



            </div>

  {/*Phone input */}
        <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>

         <input type='text' placeholder='Phone no.' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434] ' required
         onChange={onChangeHandler} name='phone' value={formData.phone}          />

        </div>             

      <button type='submit' className='text-[18px]  active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-[white] flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[15%] right-[30%] border-[1px] border-[#80808049] ml-[30px] mt-[35px] ' >Place Order</button>

         </form>

  

    </div>

      <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]  '>
         
        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col '>

           <CartTotal/>
         <div className='py-[10px]'>

            <Title text1={"PAYMENT"} text2={"METHOD"} />

         </div>

    <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]  '>

     <button onClick={()=>setMethod('RAZORPAY')} className={`w-[150px] h-[50px] rounded-sm ${method === 'RAZORPAY' ? "border-[5px] border-blue-900 rounded-sm ": "" }  ` }>
        <img src={razorpay}  className='w-[100%] h-[100%] object-fill rounded-sm ' />
     </button>

     <button onClick={()=>setMethod('COD')} className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-md text-[#332f6f] font-bold ${method === 'COD' ? "border-[5px] border-blue-900 rounded-sm ": "" }  ` }>
     CASH ON DELIVERY
     </button>     
               

    </div>

             </div>

        </div> 

    </div>
  )
}

export default PlaceOrder