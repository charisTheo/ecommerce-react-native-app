import { 
  ADD_OR_REMOVE_FROM_SHOPPING_CART,
  ADD_OR_REMOVE_FROM_WISH_LIST,
  CLEAR_STATE_AFTER_TOAST
} from "../actions/actionTypes";

import dummyProductsData from './../../dummyProductsData.json'
// in case dummy data was not passed to state when initialising the reducer
const initialState = {
  products: dummyProductsData.products
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_OR_REMOVE_FROM_WISH_LIST: 
      var updatedProduct = {};
      var updatedProducts = state.products.map(product => {
        if (product.id === action.productId) {
          product.isInWishList = !product.isInWishList;
          updatedProduct = product;
        }
        return product;
      });
      

      console.log("reducer[products]: udpated products list. Products in wish list: ", 
        updatedProducts.filter(product => product.isInWishList)
      );

      return {
        ...state,
        products: updatedProducts,
        updatedProduct: updatedProduct,
        updatedListName: 'wish list'
      }

    case ADD_OR_REMOVE_FROM_SHOPPING_CART:
      var updatedProduct = {};
      var updatedProducts = state.products.map(product => {
        if (product.id === action.productId) {
          product.isInShoppingCart = !product.isInShoppingCart;
          updatedProduct = product;
        }
        return product;
      });

      console.log("reducer[products]: udpated products list. Products in shopping cart: ", 
        updatedProducts.filter(product => product.isInShoppingCart)
      );
      
      return {
        ...state,
        products: updatedProducts,
        updatedProduct,
        updatedListName: 'shopping cart'
      }

    case CLEAR_STATE_AFTER_TOAST: 
      return {
        ...state,
        updatedProduct: null,
        updatedListName: null
      }
    default:
      return state;
  }
}

export default reducer;
