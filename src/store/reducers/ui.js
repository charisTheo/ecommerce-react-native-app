import { UI_START_LOADING, UI_STOP_LOADING } from '../actions/actionTypes';

const initialState = {
    isLoading: false
};

// TODO: add functionality for showing the user a message of how the item has been modified
// ex: Removed from your favourites, Removed from your Wish list, Added to your favourites, Added to your shopping cart

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default: 
        return state;
    }
}

export default reducer;