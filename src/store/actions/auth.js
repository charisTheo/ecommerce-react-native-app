import { AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        const api_key = "AIzaSyDR5vECe3_Wt3Twasy8gypY2_4--ZSJPsQ";
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${api_key}`;
        if (authMode === "signup") {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${api_key}`;
        }

        fetch(
            url, 
            {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            alert("Authentication failed :/ ");
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if (!parsedRes.idToken) {
                if (parsedRes.error) {
                    let errorMessage;
                    switch (parsedRes.error.message) {
                        case "EMAIL_EXISTS": {
                            errorMessage = "The email address is already in use by another account :/";
                            break;
                        }
                        case "OPERATION_NOT_ALLOWED": {
                            errorMessage = "Password sign-in is disabled for this project :/";
                            break;
                        }
                        case "TOO_MANY_ATTEMPTS_TRY_LATER": {
                            errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
                            break;
                        }
                        default: {
                            errorMessage = "Authentication failed :/";
                            break;
                        }
                    }
                    alert(errorMessage);
                }
             } else {
                dispatch(authSetToken(parsedRes.idToken));
                startMainTabs();
            }
        });
    };
};


export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};