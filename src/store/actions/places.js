import { REMOVE_PLACE, SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() => {
            alert("No valid token found :/");
        })
        .then(token => {
            return fetch("https://us-central1-reactapp-1529053160705.cloudfunctions.net/storeImage", {
                method: "POST",
                body: JSON.stringify({
                    image: image.base64
                })
            });
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            fetch("https://reactapp-1529053160705.firebaseio.com/places.json", {
              method: "POST",
              body: JSON.stringify(placeData)
            })    
            .catch(err => {
                console.log(err);
                alert("Something went wrong :/");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading())
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong :/");
                dispatch(uiStopLoading());
            })
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong :/");
            dispatch(uiStopLoading());
        });
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    }
}

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
          .catch(() => {
              alert("No valid token found :/");
          })  
          .then((token) => {
              return fetch("https://reactapp-1529053160705.firebaseio.com/places.json?auth=" + token);
          })
          .then(res => res.json())
          .then(parsedRes => {
              const places = [];
              for (let key in parsedRes) {
                  places.push({
                      ...parsedRes[key],
                      key: key,
                      image: {
                          uri: parsedRes[key].image
                      }
                  });
              }
              dispatch(setPlaces(places));
          })
          .catch(err => {
            alert("something went wrong :/");
            console.log(err);
          });
    };
};

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found :/");
            })    
            .then(token => {
                //update store
                dispatch(removePlace(key));
                //update firebase
                return fetch(`https://reactapp-1529053160705.firebaseio.com/places/${key}.json?auth=${token}`, {
                    method: "DELETE"
                });
            })
            .then(res => {
                console.log("Done!");
            })
            .catch(err => {
                //can readd the place if it fails
                console.log(err);
                alert("error while deleting the place!");
            });
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};

