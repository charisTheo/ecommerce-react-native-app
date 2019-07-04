import { ToastAndroid } from 'react-native';

import { 
  ADD_OR_REMOVE_FROM_FAVOURITES,
  ADD_OR_REMOVE_FROM_SHOPPING_CART,
  ADD_OR_REMOVE_FROM_WISH_LIST
} from "../actions/actionTypes";

import dummyProductsData from './../../dummyProductsData.json'

const initialState = {
  products: dummyProductsData.products
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_OR_REMOVE_FROM_FAVOURITES: 
      var updatedProducts = state.products.map(product => {
        if (product.id === action.productId) {
          product.isFavourite = !product.isFavourite;
        }
        return product;
      });
      
      showToast(updatedProducts, action.productId, 'isFavourite', 'favourites')

      return {
        ...state,
        products: updatedProducts
      }

    case ADD_OR_REMOVE_FROM_WISH_LIST: 
      var updatedProducts = state.products.map(product => {
        if (product.id === action.productId) {
          product.isInWishList = !product.isInWishList;
        }
        return product;
      });

      showToast(updatedProducts, action.productId, 'isInWishList', 'wish list')

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
 * @param {String} propertyToCheck - the boolean property of the product object (ex: isFavourite, isInWishList, etc).
 * @param {String} desc - the list name that is shown to the user within the toast message (ex: favourites, wish list, etc).
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