import React, { createContext, useContext, useEffect, useState } from 'react'
import UserContext, { userDataContext } from './UserContext'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const shopDataContext = createContext()

function ShopContext({ children }) {

  let [products, setProducts] = useState([])

  let [search, setSearch] = useState("")
  let [showSearch, setShowSearch] = useState(false)

  let [loading, setLoading] = useState(false)

  let [cartItem, setCartItem] = useState({})

  let { userData } = useContext(userDataContext)

  let { serverUrl } = useContext(authDataContext)

  let currency = '$';
  let currencyCode = 'usd';

  let delivery_fee = 10;

  const getProducts = async (page = 1, limit = 200) => {

    try {

      let result = await axios.get(serverUrl + "/api/product/list", {
        params: { page, limit },
        withCredentials: true
      })

      const productsData = result.data?.data || result.data || []
      setProducts(productsData)

    } catch (error) {
    }

  }


  const addToCart = async (itemId, size) => {
    const cartSize = size || "default"

    let cartData = structuredClone(cartItem);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][cartSize]) {
      cartData[itemId][cartSize] += 1;
    }
    else {
      cartData[itemId][cartSize] = 1;
    }

    setCartItem(cartData);

    if (userData) {

      try {

        let result = await axios.post(serverUrl + '/api/cart/add', { itemId, size: cartSize }, { withCredentials: true })

        setLoading(false)

        await getUserCart()

      } catch (error) {
        setLoading(false)
      }


    }



  };

  const getUserCart = async () => {
    try {

      const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })

      setCartItem(result.data)

    } catch (error) {
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItem)

    cartData[itemId][size] = quantity

    if (quantity === 0) {
      delete cartData[itemId][size]
    }


    setCartItem(cartData)

    if (userData) {
      try {

        let result = await axios.post(serverUrl + '/api/cart/update', {
          itemId,
          size,
          quantity
        }, { withCredentials: true })

        await getUserCart()

      } catch (error) {
      }
    }

  }



  const getCartCount = () => {
    let totalCount = 0

    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item]
          }
        } catch (error) {
        }
      }
    }

    return totalCount;
  }

  const getCartAmount = () => {
    let totalAmount = 0

    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
        }
      }
    }
    return totalAmount
  }

  useEffect(() => {

    getProducts()

  }, [])

  useEffect(() => {

    getUserCart()

  }, [])




  let value = {
    products, setProducts, delivery_fee, currency, currencyCode,
    showSearch, setShowSearch,
    search, setSearch,
    getProducts,
    cartItem, addToCart, getCartCount, setCartItem, updateQuantity, getCartAmount

  }

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext