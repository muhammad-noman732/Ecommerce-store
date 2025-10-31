import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'


export const userDataContext = createContext()


function UserContext({children}) {

    let {serverUrl} = useContext(authDataContext)

    let [userData,setUserData]= useState("")

    let [loading,setLoading ] = useState(false)

    let [name,setName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword]=useState("")

    let getCurrentUser = async()=>{
        try{

         let result = await axios.get(serverUrl+"/api/user/getcurrentuser",{withCredentials:true})
         
         setUserData(result.data)

         console.log("Get Current User Data ", result.data)

        }catch(error){
          console.log("Get Current User data error ❌", error.response?.data || error.message)
          setUserData("")
                      
        }
    }


   useEffect(()=>{

 {/*💬 What is getCurrentUser()?

    It's a function that runs only one time when user logs in :

Sends a request to your backend (/api/user/getcurrentuser)

Gets the user info (like name, email, etc.)

Saves that info in userData state

This is how your app knows who is currently logged in. */}   

     getCurrentUser()

     {/*empty dependency means
        Run this code only once when the component loads — not again and again */}
   },[]) 

    let value = {userData ,setUserData,loading,setLoading,name,setName,
        email,setEmail,
        password,setPassword,
        getCurrentUser

    }

  return (
    <div>
      <userDataContext.Provider value={value}>
        
        {children}
       
      </userDataContext.Provider>


    </div>
  )
}

export default UserContext