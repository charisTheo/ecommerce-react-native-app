import { REMOVE_PLACE, SET_PLACES } from '../actions/actionTypes';

const initialState = {
    places: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES: 
            return {
                ...state,
                places: action.places
            }
        case REMOVE_PLACE: 
            return {
                ...state,
                places: state.places.filter((place) => {
                    return place.key !== action.key;
                })
            };
        default: 
            return state;
    }
};

export default reducer;