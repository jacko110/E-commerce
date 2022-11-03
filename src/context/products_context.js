import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen : false,
  product_loading:false,
  product_error:false,
  product:[],
  featured_product:[],
  single_product_loading:false,
  single_product_error:false,
  single_product:[]
}

const ProductsContext = React.createContext()


export const ProductsProvider = ({ children }) => {
  const[state,dispatch ] = useReducer(reducer,initialState)

  const openSiderbar = () =>{
    dispatch({type:SIDEBAR_OPEN})
  }
  const closeSiderbar = ()=>{
    dispatch({type:SIDEBAR_CLOSE})
  }

  const fetchProduct = async(url) =>{
    dispatch({type:GET_PRODUCTS_BEGIN})
    try {
      const res = await axios.get(url)
      // console.log(res.data);
      const product = res.data
      
      dispatch({type:GET_PRODUCTS_SUCCESS,payload:product})
    } catch (error) {
      dispatch({type:GET_PRODUCTS_ERROR})
    }
  }

  const fetchSingleProduct = async(url)=>{
    dispatch({type:GET_SINGLE_PRODUCT_BEGIN})
    try {
      const res = await axios.get(url)
      const singleproduct = res.data
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:singleproduct})
    } catch (error) {
      dispatch({type:GET_SINGLE_PRODUCT_ERROR})
    }
  }
useEffect(()=>{
  fetchProduct(url)
},[])
  return (
    <ProductsContext.Provider value={{...state,openSiderbar,closeSiderbar,fetchProduct,fetchSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
