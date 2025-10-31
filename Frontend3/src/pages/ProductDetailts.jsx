import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../Context/ShopContext'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../Components/RelatedProduct';



function ProductDetailts() {

    let {productId}=useParams()

    let {products,currency,      cartItem,addToCart,getCartCount,setCartItem}=useContext(shopDataContext)

    let [productData, setProductData]=useState(false)

    const [image , setImage]=useState('')

    const [image1 , setImage1]=useState('')
    
    const [image2 , setImage2]=useState('')
    
    const [image3 , setImage3]=useState('')
    
    const [image4, setImage4]=useState('')
    
    const [size , setSize]=useState('') 

const fetchProducts = async () => {

 //The find() method is used to search an array and return the first item that matches a condition.   
  const foundProduct = products.find(item => item._id === productId);

  if (foundProduct) {
    setProductData(foundProduct);
    setImage(foundProduct.image1);
    setImage1(foundProduct.image1);
    setImage2(foundProduct.image2);
    setImage3(foundProduct.image3);
    setImage4(foundProduct.image4);
  }
}

 useEffect(()=>{

    fetchProducts() 

 },[productId,products])

    

  return (
    <div>

       <div className='w-[99vw] min-h-[122vh] md:h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px]  '>
        
         <div className='lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row'>

         <div className='lg:w-[20%] md:w-[80%] h-[10%] lg:h-[90%]  flex items-center justify-center gap-[50px] lg:gap-[25px] lg:flex-col flex-wrap '>

           <div className='md:w-[95px] w-[50px] h-[50px] md:h-[95px] bg-slate-300 border-[1px] border-[#80808049] rounded-md '>

            <img src={image1} className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setImage(image1)}/>

           </div>

           <div className='md:w-[95px] w-[50px] h-[50px] md:h-[95px] bg-slate-300 border-[1px] border-[#80808049] rounded-md '>

            <img src={image2} className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setImage(image2)}/>

           </div>


           <div className='md:w-[95px] w-[50px] h-[50px] md:h-[95px] bg-slate-300 border-[1px] border-[#80808049] rounded-md '>

            <img src={image3} className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setImage(image3)}/>

           </div>



           <div className='md:w-[95px] w-[50px] h-[50px] md:h-[95px] bg-slate-300 border-[1px] border-[#80808049] rounded-md '>

            <img src={image4} className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setImage(image4)}/>

           </div>                  



         </div>

        <div className='lg:w-[60%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden'>

          <img src={image} className='w-[100%] lg:h-[100%] text-[30px] text-[white] text-center rounded-md object-fill'/> 

            </div> 

         </div>

      
         <div className='lg:w-[50vw] w-[100vw] lg:h-[90vh] h-[50vh] lg:mt-[80px] flex items-start justify-start flex-col py-[20px] px-[30px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px] lg:py-[0px] gap-[10px]  '>

          { productData &&  <h1 className='text-[40px] font-semibold text-[aliceblue] '>{productData.name.toUpperCase()}</h1>}

         {/*Stars div */}
          <div className='flex items-center gap-1'> 
            <FaStar className='text-[20px] fill-[#FFD700]' /> 

            <FaStar className='text-[20px] fill-[#FFD700]' />


            <FaStar className='text-[20px] fill-[#FFD700]' />

            <FaStar className='text-[20px] fill-[#FFD700]' />

            <FaStarHalfAlt className='text-[20px] fill-[#FFD700]' />  

            <p className='text-[18px] font-semibold pl-[5px] text-[white]  '>(124)    </p>                      
            </div>

            {/* Price div*/}

            <p className='text-[30px] font-semibold pl-[5px] text-[white]'>{currency} {productData.price}</p>

            <p className='w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white] '>{productData.description} Best quality product and stylish , breadthable cotton cloth for kids. Easy to wash, super comfortable and designed for effortless style. </p>

            {/*Sizes div */}

          <div className='flex flex-col gap-[10px] my-[10px] '>

            <p className='text-[25px] font-semibold pl-[5px] text-[white] '>Select Size </p>

           <div className='flex gap-2'>
            { 
      productData && (
           productData.sizes.map((item,index)=>(
         <button key={index} className={`border py-2 px-4  bg-slate-300 rounded-md ${item=== size ? 'bg-[black] text-[#2f97f1] text-[21px]' : ''} `} onClick={()=>setSize(item)}>{item}</button>
                ))
            )
            }

            </div> 

            <button className='text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] px-[20px] rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-[white] shadow:lg shadow-[black] w-[250px]'onClick={()=>addToCart(productData._id,size)}>Add to Cart</button>

          </div>

         <div className='w-[90%] h-[2px] bg-slate-700'></div>

         <div className='w-[80%] text-[16px] text-[white] '>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product. </p>
            <p>Fast return and exchange policy within 7 days.</p>
         </div>


         </div>

        </div>

        <div className='w-[99vw] min-h-[70vh] bg-gradient-to-t from-[#141414] to-[#0c2025] flex items-start justify-start flex-col overflow-x-hidden md:pt-[200px] sm:pt-[200px] lg:pt-[40px] '>
            
            <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[20px] '>

         <p className='border px-5 py-3 text-sm text-[white] '>Description</p>

         <p className='border px-5 py-3 text-sm text-[white] '>Reviews (124)</p>         

            </div>

            <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] border text-[white] text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]  ' >
         <p className='w-[95%] h-[90%] flex items-center justify-center'>

          Upgrade your wardobe with the stylish slim-fit cotton shirt , available now on OneCart.Best quality product and stylish , breadthable cotton cloth for kids. Easy to wash, super comfortable and designed for effortless style.     

                </p>
            </div>

        <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />    

            </div> 

    </div>
  )
}

export default ProductDetailts