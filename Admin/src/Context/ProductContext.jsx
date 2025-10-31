import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const productDataContext=createContext()

function ProductContext({children}) {

    const [name,setName]=useState("")
    const [description,setDescription]=useState("") 
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("Men")
    const [subCategory,setSubCategory]=useState("TopWear")
    const [sizes,setSizes]=useState([]) 
    const [bestseller,setBestseller]=useState(false)

let [frontEndImage1,setFrontEndImage1]=useState(null)

let [frontEndImage2,setFrontEndImage2]=useState(null)

let [frontEndImage3,setFrontEndImage3]=useState(null)

let [frontEndImage4,setFrontEndImage4]=useState(null)

let [backEndImage1,setBackEndImage1]=useState(null)

let [backEndImage2,setBackEndImage2]=useState(null)

let [backEndImage3,setBackEndImage3]=useState(null)   

let [backEndImage4,setBackEndImage4]=useState(null) 


    let [list ,setList]=useState([])

    let {serverUrl} = useContext(authDataContext)


    const fetchList =  async()=>{
    try{
         let result = await axios.get(serverUrl+"/api/product/list",{withCredentials:true})

         setList(result.data)

        console.log("All Get Listing Data",result.data) 
         
            

        }catch(error){
     console.log("Get Listing  error ❌", error.response?.data || error.message)
        }
    }




const removeList=async(id)=>{
  
    try{


    let result = await axios.delete(serverUrl+`/api/product/remove/${id}`,{withCredentials:true})

    console.log("Product removed successfully.")
    
    await fetchList()  

    }catch(error){
     console.log("Product remove  error ❌", error.response?.data || error.message)        
    }

}

    useEffect(()=>{
        fetchList()
    },[])


   let value={
        name,setName,
        description,setDescription,
        price,setPrice,
        category,setCategory,
        subCategory,setSubCategory,
        sizes,setSizes,
        bestseller,setBestseller,
    frontEndImage1,setFrontEndImage1,
    frontEndImage2,setFrontEndImage2,
    frontEndImage3,setFrontEndImage3,
    frontEndImage4,setFrontEndImage4,
    backEndImage1,setBackEndImage1,
    backEndImage2,setBackEndImage2,
    backEndImage3,setBackEndImage3,
    backEndImage4,setBackEndImage4,

            list ,setList,
            fetchList,removeList




    }
  return (
    
    <productDataContext.Provider value={value}>

        {children}

    </productDataContext.Provider>

    
  )
}

export default ProductContext