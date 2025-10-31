import React, { useContext, useRef, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import upload from "../assets/upload.png"
import { productDataContext } from '../Context/ProductContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Add() {

    let [image1,setImage1]=useState(false)

    let [image2,setImage2]=useState(false)

    let [image3,setImage3]=useState(false)
     
    let [image4,setImage4]=useState(false)

    let {serverUrl}=useContext(authDataContext) 

    let [Adding,setAdding]=useState(false)

    let navigate=useNavigate()
    
    
    let {        
    name,setName,
    description,setDescription,
    price,setPrice,
    category,setCategory,
    subCategory,setSubCategory,
    sizes,setSizes,
    bestseller,setBestseller,
    productData,setProductData,
    frontEndImage1,setFrontEndImage1,
    frontEndImage2,setFrontEndImage2,
    frontEndImage3,setFrontEndImage3,
    frontEndImage4,setFrontEndImage4,
    backEndImage1,setBackEndImage1,
    backEndImage2,setBackEndImage2,
    backEndImage3,setBackEndImage3,
    backEndImage4,setBackEndImage4,
    
    fetchList
    
    }=useContext(productDataContext)
    
    {/*Using useRef for accessing files */}
    const image1Ref=useRef(null)
    const image2Ref=useRef(null)
    const image3Ref=useRef(null)
    const image4Ref=useRef(null)

    /*For image1 */

    const handleImage1=(e)=>{
        try{

       //image1Ref.current → input DOM node
       let file=image1Ref.current?.files[0]

      if(file){

       setBackEndImage1(file)
      
      setFrontEndImage1(URL.createObjectURL(file))
      }

        }catch(error){
      console.log("adding product image1 error ❌", error.response?.data || error.message)

        }
    }

    /*For image2 */

    const handleImage2=(e)=>{
        try{

        //image2Ref.current → input DOM node
          let file=image2Ref.current?.files[0]

        if(file){

       setBackEndImage2(file)
      
      setFrontEndImage2(URL.createObjectURL(file))
      }  

        }catch(error){
      console.log("adding product image2 error ❌", error.response?.data || error.message)

        }
    }
    /*For image3 */

    const handleImage3=(e)=>{
        try{

     //image3Ref.current → input DOM node
         let file=image3Ref.current?.files[0]

     if(file){

     setBackEndImage3(file)
      
      setFrontEndImage3(URL.createObjectURL(file))
      } 

        }catch(error){
      console.log("adding product image3 error ❌", error.response?.data || error.message)
        }
    }
    /*For image4 */

    const handleImage4=(e)=>{
        try{

        //image4Ref.current → input DOM node
          let file = image4Ref.current?.files[0]
              
        if(file){

       setBackEndImage4(file)
      
      setFrontEndImage4(URL.createObjectURL(file))
      }  

        }catch(error){
      console.log("adding product image4 error ❌", error.response?.data || error.message)

        }
    } 
    
    const handleAddProduct=async(e)=>{
        e.preventDefault()

        setAdding(true)

        try{

        let formData=new FormData()

        formData.append("name",name)
       
        formData.append("description",description)
       
        formData.append("price",price)
       
        formData.append("category",category)

        formData.append("subCategory",subCategory)

        formData.append("bestseller",bestseller)

        //we doing this because FormData send data to the backend in string format. so we are converting the array to string before sending it to backend. For eaxmple, if an array looks like this ["S","M","L","XL","XXL"] we are converting it to string using JSON.stringify() method and the array becomes like this    '["S","M","L","XL","XXL"]'. You can see the quotes outside the array which makes it a string. In backend, we use JSON.parse() method to convert this string to array. 
        formData.append("sizes",JSON.stringify(sizes))

        formData.append("image1",backEndImage1)

        formData.append("image2",backEndImage2)

        formData.append("image3",backEndImage3)

        formData.append("image4",backEndImage4)

    
     let result=await axios.post(serverUrl+"/api/product/addproduct",formData,     
        {withCredentials:true,
 
        headers: { "Content-Type": "multipart/form-data" }
       })  
       
       console.log(result.data)

       navigate("/")
       setAdding(false)

       await fetchList()


     {/*Now clearing the input fields */}
     
     if(result.data){
        setName("")
        setDescription("")
        setFrontEndImage1(null)
        setFrontEndImage2(null)
        setFrontEndImage3(null)
        setFrontEndImage4(null)
        setBackEndImage1(null)
        setBackEndImage2(null)
        setBackEndImage3(null)
        setBackEndImage4(null)
        setPrice("")
        setBestseller(false)
        setCategory("Men")
        setSubCategory("TopWear")
        setSizes([])
        setBestseller(false)
     }


        }catch(error)
        {
     console.log("Product add  error ❌", error.response?.data || error.message)
     setAdding(false)
        }

    }
    
  return (
    <div className='w-[100vw] min-h-[100vh]  bg-gradient-to-t from-[#141414] to-[#0c2025] overflow-x-hidden relative text-[white] pt-[70px]'>
        <Nav/>
  <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c2025] z-40"></div> {/* ← Add this */}

        <Sidebar/>

     {/*Form div */}
    <div className='w-[82%] min-h-[100vh] flex items-center justify-start overflow-x-hidden absolute right-0 top-[85px]'>

       <form className='w-[100%] 
       md:w-[90%] h-[100%]  flex flex-col gap-[45px] py-[60px] px-[30px] md:px-[60px] relative' onSubmit={handleAddProduct}>

        {/*Title */}
        <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] text-[white] top-[0px] absolute'>Add Product Page</div>

       {/*images upload div*/}
        <div className='w-[90%] h-[130px] flex items-start justify-center flex-col mt-[28px] gap-[10px]'>
           <p className='text-[20px] md:text-[25px] font-semibold'>Upload Images</p>

         <div className='w-[100%] h-[100%] flex items-center justify-start gap-[10px] md:gap-[15px]'>
            
        {/*Image1 */}
        <label htmlFor='image1' className='w-[190px] h-[100px] md:w-[100px]  md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
          <img src={!frontEndImage1 ? upload: frontEndImage1}  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:[#1d1d1d] border-[2px]'/>
        <input 
          type="file"
          
          id='image1'
          
          hidden 
          ref={image1Ref}
          onChange={handleImage1} 
           required/>
        </label>  


      {/*Image2 */}
        <label htmlFor='image2' className='w-[190px] h-[100px] md:w-[100px]  md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
        <img src={!frontEndImage2 ? upload: frontEndImage2}  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:[#1d1d1d] border-[2px] '/>
        <input 
         type="file"
         id='image2' 
         hidden 
         ref={image2Ref}
         onChange={handleImage2}
         required />
        </label>

      {/*Image3 */}
        <label htmlFor='image3' className='w-[190px] h-[100px] md:w-[100px]  md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
         <img src={!frontEndImage3 ? upload : frontEndImage3}  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:[#1d1d1d] border-[2px]'/>
          <input 
           type="file"
           id='image3' 
           hidden 
           ref={image3Ref}
           onChange={handleImage3} 
           required/>
        </label> 

      {/*Image4 */}
        <label htmlFor='image4' className='w-[190px] h-[100px] md:w-[100px]  md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
          <img src={!frontEndImage4 ? upload:frontEndImage4}  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:[#1d1d1d] border-[2px]'/>
         <input 
            type="file" 
            id='image4'
            hidden 
            ref={image4Ref}
            onChange={handleImage4} 
            required/>
        </label>                 


            </div>  
            
           
        </div>

     
     {/*Product name input */}
         <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Name</p>

         <input type="text" placeholder='Type Here' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[10px] md:px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
         value={name}
         onChange={(e)=>setName(e.target.value)}
          required/>

         </div>

     {/*Product description input */}
         <div className='w-[80%]  flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Description</p>

         <textarea type="text" placeholder='Type Here' className='w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]'
         value={description}
         onChange={(e)=>setDescription(e.target.value)}
          required/>

         </div>

         {/* Category and subCategory section*/}
      <div className='w-[80%] flex items-center gap-[25px] flex-wrap'>

     {/* Category div */}
     <div className='md:w-[45%]  w-[60%] flex items-start sm:justify-center flex-col gap-[10px]'>

          <p className='text-[20px] md:text-[23px] font-semibold'>Product Category</p>

    <select className='bg-slate-600 w-[80%]  px-[10px] py-[7px] hover:border-[#46d1f7] border-[2px] rounded-lg' onChange={(e)=>setCategory(e.target.value)}>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>          
            </select>

     </div>

    {/*Sub category div */}
     <div className='md:w-[45%]  w-[60%] flex items-start sm:justify-center flex-col gap-[10px] '>

        <p className='text-[20px] md:text-[23px] font-semibold'>Sub-Category</p>

    <select className='bg-slate-600 w-[80%]  px-[10px] py-[7px] hover:border-[#46d1f7] border-[2px] rounded-lg' onChange={(e)=>setSubCategory(e.target.value)}>
        <option value="TopWear">TopWear</option>
        <option value="BottomWear">BottomWear</option>
        <option value="WinterWear">WinterWear</option>          
            </select>

     </div>     

    </div>


     {/*Product price input */}
         <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Price</p>

         <input type="Number" placeholder='$/-' className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[10px] md:px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
         value={price}
         onChange={(e)=>setPrice(e.target.value)}
          required/>

         </div>


         {/*Sizes section div */}

    <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]'>

    <p className='text-[20px] md:text-[25px] font-semibold'>Product Size</p>
     
    <div className='flex items-center justify-start gap-[25px] flex-wrap '>

   {/*Small size (S) div*/}
     <div className={`px-[20px] py-[7px] rounded-lg text-[18px] border-[2px] cursor-pointer
    ${sizes.includes("S") ? "bg-[#ecfafaec] text-black border-white shadow-lg" : "bg-slate-600 hover:border-[#46d1f7]"}`} 
        onClick={()=>
        setSizes(prev=>
        prev.includes("S") ? 
        prev.filter((item)=>item !== "S") 
        : [...prev,"S"] )}>S</div>

   {/*Medium size (M) div*/}
    <div className={`px-[20px] py-[7px] rounded-lg text-[18px] border-[2px] cursor-pointer
       ${sizes.includes("M") ? "bg-[#ecfafaec] text-black border-white shadow-lg" : "bg-slate-600 hover:border-[#46d1f7]"}`}

         onClick={()=>
        setSizes(prev=>
        prev.includes("M") ? 
        prev.filter((item)=>item !== "M") 
        : [...prev,"M"] )}>M</div>

    
    {/*large size (L) div*/}
    <div className={`px-[20px] py-[7px] rounded-lg text-[18px] border-[2px] cursor-pointer
       ${sizes.includes("L") ? "bg-[#ecfafaec] text-black border-white shadow-lg" : "bg-slate-600 hover:border-[#46d1f7]"}`}
         
        onClick={()=>
        setSizes(prev=>
        prev.includes("L") ? 
        prev.filter((item)=>item !== "L") 
        : [...prev,"L"] )}>L</div>

   
   {/*Extra Large size (XL) div*/}
       <div className={`px-[20px] py-[7px] rounded-lg text-[18px] border-[2px] cursor-pointer
       ${sizes.includes("XL") ? "bg-[#ecfafaec] text-black border-white shadow-lg" : "bg-slate-600 hover:border-[#46d1f7]"}`}
       
        onClick={()=>
        setSizes(prev=>
        prev.includes("XL") ? 
        prev.filter((item)=>item !== "XL") 
        : [...prev,"XL"] )}>XL</div> 

   
   {/*Extra extra Large size (XXL) div*/}
        <div className={`px-[20px] py-[7px] rounded-lg text-[18px] border-[2px] cursor-pointer
       ${sizes.includes("XXL") ? "bg-[#ecfafaec] text-black border-white shadow-lg" : "bg-slate-600 hover:border-[#46d1f7]"}`}
         
        onClick={()=>
        setSizes(prev=>
        prev.includes("XXL") ? 
        prev.filter((item)=>item !== "XXL") 
        : [...prev,"XXL"] )}>XXL</div>                                


          </div>
          
         </div>

    {/*Best Seller div */}

    <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px]'>
        
     <input type='checkbox' id='checkbox' className='w-[25px]  h-[25px] cursor-pointer' onChange={()=>setBestseller(prev=>!prev)}  />   

     <label htmlFor='checkbox' className='text-[18px] md:text-[22px] font-semibold '>
        Add to BestSeller
     </label>

        </div> 

    {/*Submit button  */ }
     <button type='submit' className='w-[180px] px-[20px] py-[15px] rounded-xl bg-[#2f8aa3] flex items-center justify-center gap-[10px] text-[black] active:bg-slate-700 active:text-[white] active:border-[2px] border-[white] mt-[40px]  font-bold' disabled={Adding}>{Adding? "Adding Product" : "Add Product"} </button>       

       </form>

        </div>

    </div>
  )
}

export default Add