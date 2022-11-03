import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS){
    let maxPrice = action.payload.map((item)=>item.price)
    // console.log(maxprice);
    maxPrice = Math.max(...maxPrice)
    return{...state,all_products:[...action.payload],filtered_product:[...action.payload],filters:{...state.filters,max_price:maxPrice,price:maxPrice}}
  }
  if(action.type === SET_GRIDVIEW){
    return{...state,grid_view:true}
  }
  if(action.type === SET_LISTVIEW){
    return{...state,grid_view:false}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
