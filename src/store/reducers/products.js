import { ToastAndroid } from 'react-native';

import { 
  ADD_OR_REMOVE_FROM_SHOPPING_CART,
  ADD_OR_REMOVE_FROM_WISH_LIST
} from "../actions/actionTypes";

import dummyProductsData from './../../dummyProductsData.json'
// in case dummy data was not passed to state when initialising the reducer
const initialState = {
  products: dummyProductsData.products
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_OR_REMOVE_FROM_WISH_LIST: 
      var updatedProducts = state.products.map(product => {
        if (product.id === action.productId) {
          product.isInWishList = !product.isInWishList;
        }
        return product;
      });

      showToast(updatedProducts, action.productId, 'isInWishList', 'wish list')
      console.log("reducer[products]: udpated products list. Products in wish list: ", 
        updatedProducts.filter(product => product.isInWishList)
      );

      return {
        ...state,
        products: updatedProducts
      }

    case ADD_OR_REMOVE_FROM_SHOPPING_CART:
      var updatedProducts = state.products.map(product => {
        if (product.id === action.productId) {
          product.isInShoppingCart = !product.isInShoppingCart;
        }
        return product;
      });

      showToast(updatedProducts, action.productId, 'isInShoppingCart', 'shopping cart')
      console.log("reducer[products]: udpated products list. Products in shopping cart: ", 
        updatedProducts.filter(product => product.isInShoppingCart)
      );
      
      return {
        ...state,
        products: updatedProducts
      }

    default:
      return state;
  }
}

/**
 * Filters out the updated product and checks whether it was added or removed 
 * from the given list.
 * Shows a toast based on the addition or removal of the product in the list.
 * 
 * @param {Array<Object>} productsArr - the updated products array
 * @param {Number} productId - the id of the product by which the filter is carried out
 * @param {String} propertyToCheck - the boolean property of the product object (ex: isInWishList, inInShoppingCart etc).
 * @param {String} desc - the list name shown to the user within the toast message (ex: wish list, shopping cart etc).
 */
const showToast = (productsArr, productId, propertyToCheck, desc) => {
  var updatedProduct = productsArr.filter(product => product.id === productId)[0];
  var isUpdatedProductAdded = updatedProduct[propertyToCheck];
  var toastMessage = isUpdatedProductAdded ? 
  `Product has been added to your ${desc}!` : 
  `Product has been removed from your ${desc}!`;
  ToastAndroid.show(toastMessage, ToastAndroid.SHORT);
}

export default reducer;