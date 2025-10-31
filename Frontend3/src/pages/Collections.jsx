import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import Title from '../Components/Title';
import { shopDataContext } from '../Context/ShopContext';
import Card from '../Components/Card';

function Collections() {

  let [showFilter,setShowFilter]=useState(false)



  let {products,search,showSearch}=useContext(shopDataContext)

  let [filterProduct, setFilterProduct]=useState([])


  let [category, setCategory]=useState([])

  let [subCategory, setSubCategory]=useState([]) 
  
  let [sortType,setSortType]=useState("relevent")


  //if it's already selected, unselect it. If it's not selected, add it to the array.
  const toggleCategory=(e)=>{

    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item=>item!==e.target.value))
    }else{

      setCategory(prev=>[...prev,e.target.value])

    }
  }

//if it's already selected, unselect it. If it's not selected, add it to the array.
  const toggleSubCategory=(e)=>{
 
    
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item=>item!==e.target.value))
    }else{

      setSubCategory(prev=>[...prev,e.target.value])

    }    


  }  


  const applyFilter=()=>{
    //first we are taking all the product

    /*
  let productCopy = products.slice();
This creates a shallow copy of the original products array.

slice() returns a new array without modifying the original.

Why? So we don’t accidentally mess up the original products array from context.
     */

    let productCopy=products.slice()



  if(showSearch && search){

    productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))

  }  

    // This line filters an array of products, keeping only the products whose category matches one of the categories selected by the user.Like category contains the data which is being selected by user and then we are filtering the productCopy data by check if the category which the user selected matches any of the categories inside the product data. If it matches then keep that data and discard the remaining data
    if(category.length>0){
      productCopy=productCopy.filter(item=>category.includes(item.category))
    }

     // now we are filtering if items of that sbCategory exits in category
    if(subCategory.length>0){
      productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    
    setFilterProduct(productCopy)

  }



  const sortProducts=(e)=>{
    let fbCopy=filterProduct.slice()

    switch(sortType)
    {
       case 'low-high':
        setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))

/*a.price - b.price:

If a is cheaper → result is negative → a comes before b

If a is more expensive → result is positive → b comes before a */

        break;


        case 'high-low':
        setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
        break;
        
        default:
          applyFilter()  
          break;

    }

  }

  useEffect(()=>{
    
    sortProducts()

  },[sortType])




  /*The first useEffect runs when the products data is first received (or changes), and sets the filterProduct to show all products by default.

🧭 Flow:
When your component loads, products comes from context (shopDataContext).

When the products array is first available or changes, this useEffect runs.

It sets:
filterProduct = products
So all products will be shown on the screen before any filters are applied.

📌 Real-Life Analogy:
Imagine you enter a store and the shelves are fully stocked — you haven’t applied any filters yet, so you see everything.

 */

  useEffect(()=>{
    setFilterProduct(products)
  },[products])


  /*
 
 The second useEffect runs every time the user selects or unselects a category or subcategory.
Its job is to filter the products based on user choices.

🧭 Flow:
The user checks a checkbox (e.g., selects "Men").

This updates the category state using setCategory.

Because category has changed, this useEffect runs.

It calls applyFilter() — which filters the products based on selected category and subCategory.

The result is saved in filterProduct, and the UI updates to show only matching products.

🔁 It works the same for subcategories too:
When subCategory changes → this useEffect runs → filters again. 
  
  */
  useEffect(()=>{
    applyFilter()
  },[category,subCategory,search,showSearch])

  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-[#141414] to-[#0c2025] flex  flex-col md:flex-row   pt-[70px] pb-[100px] overflow-x-hidden z-[2] '>

     <div className={`md:w-[30vw] lg:w-[20vw] w-[100vw]  md:min-h-[100vh] ${showFilter ? "h-auto" : "h-[8vh]"} p-[20px] border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed top-0 pt-[20px] md:pt-[30px] lg:pt-[87px] `}> 

      <p  className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer' onClick={()=>setShowFilter(prev=>!prev)}>
        FILTERS

        { !showFilter && <FaChevronRight className='text-[18px] md:hidden' />}

        { showFilter && <FaChevronDown
         className='text-[18px] md:hidden' />}
      
      </p>

      <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>

        <p className='text-[18px] text-[#f8fafa]'>CATEGORIES</p>

       <div className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col'>

        <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>
          <input type='checkbox' value={'Men'} className='w-3' onChange={toggleCategory}/>
          Men</p>


        <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>
          <input type='checkbox' value={'Women'} className='w-3' onChange={toggleCategory}/>
          Women</p>


        <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>
          <input type='checkbox' value={'Kids'} className='w-3' onChange={toggleCategory}/>
          Kids</p>                    

       </div>


      </div>

      <div className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>

        <p className='text-[18px] text-[#f8fafa]'>SUB CATEGORIES</p>

       <div className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col'>

        <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>
          <input type='checkbox' value={'TopWear'} className='w-3'  onChange={toggleSubCategory}  />
          TopWear</p>


        <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>
          <input type='checkbox' value={'BottomWear'} className='w-3' onChange={toggleSubCategory}/>
          BottomWear</p>


        <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'>
          <input type='checkbox' value={'WinterWear'} className='w-3' onChange={toggleSubCategory}/>
          WinterWear</p>                    

       </div>


      </div>      

     </div>

     <div className='lg:pl-[20%] md:py-[10px]'>
         
         <div className='md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]'>

          <Title text1={"ALL"} text2={"COLLECTIONS"} />

         <select className='bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[15px] text-[white] rounded-lg hover:border-[#46d1f7] border-[2px] 'onChange={(e)=>setSortType(e.target.value)} >

          <option value="relevent"    className='w-[100%] h-[100%]'>Sort By: Relevent</option>

          <option value="low-high"    className='w-[100%] h-[100%]'>Sort By: Low to High</option>

          <option value="high-low"    className='w-[100%] h-[100%]'>Sort By: High to Low</option>                      

         </select>

         </div>

       <div className='lg:w-[80vw] md:w-[60px] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px] '>

        {
          filterProduct.map((item,index)=>(
           <Card key={index}  name={item.name} image={item.image1} id={item._id} price={item.price}  /> 
          )
        )}

       </div>

     </div>

    </div>

     

  )
}

export default Collections