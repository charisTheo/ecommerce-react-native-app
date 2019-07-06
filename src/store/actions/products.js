import { 
  ADD_OR_REMOVE_FROM_WISH_LIST,
  ADD_OR_REMOVE_FROM_SHOPPING_CART,
  CLEAR_STATE_AFTER_TOAST
} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

// TODO: pass in the id of the product to only show the spinner 
// for the given product and not for all of them

export const wishListButtonPressAction = id => {
  return dispatch => {
    dispatch(uiStartLoading());
    
    // simulating a 500 ms delay of an API call to the database
    setTimeout(() => {
      dispatch(addOrRemoveFromWishList(id));
      dispatch(uiStopLoading())
    }, 500);
  }  
}

export const addOrRemoveFromWishList = id => {
  return {
    type: ADD_OR_REMOVE_FROM_WISH_LIST,
    productId: id
  }
}

export const shoppingCartButtonPressAction = id => {
  return dispatch => {
    dispatch(uiStartLoading());
    
    // simulating a 500 ms delay of an API call to the database
    setTimeout(() => {
      dispatch(addOrRemoveFromShoppingCart(id));
      dispatch(uiStopLoading())
    }, 500);
  } 
}

export const addOrRemoveFromShoppingCart = id => {
  return {
    type: ADD_OR_REMOVE_FROM_SHOPPING_CART,
    productId: id
  }
}

export const clearStateAfterToastAction = () => {
  return {
    type: CLEAR_STATE_AFTER_TOAST
  }
}
