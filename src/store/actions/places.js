import { REMOVE_PLACE, SET_PLACES, PLACE_ADDED, START_ADD_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    };
};

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let token;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() => {
            alert("No valid token found :/");
        })
        .then(tkn => {
            token = tkn;
            return fetch("https://us-central1-reactapp-1529053160705.cloudfunctions.net/storeImage", {
                method: "POST",
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    authorization: "Bearer " + token
                }
            });
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw(new Error());
            }
        })
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl,
                imagePath: parsedRes.imagePath
            };
            fetch("https://reactapp-1529053160705.firebaseio.com/places.json?auth=" + token, {
              method: "POST",
              body: JSON.stringify(placeData)
            })    
            .catch(err => {
                console.log(err);
                alert("Something went wrong :/");
                dispatch(uiStopLoading());
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw(new Error());
                }
            })
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
                dispatch(placeAdded());
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

export const placeAdded = () => {
    return {
        type: PLACE_ADDED
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
                if (res.ok) {
                    return res.json();
                } else {
                    throw(new Error());
                }
            })
            .then(parsedRes => {
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

