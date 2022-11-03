import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filtered_product:product,grid_view} = useFilterContext()
  if(product.lenth < 1 ){
    return(
      <h5 style={{ textTransform: 'none' }}>
      Sorry, no products matched your search.
    </h5>
    )
  }
  if(grid_view===false){
    return <ListView product={product}/>
  }

  return <GridView product={product}/>
}

export default ProductList
