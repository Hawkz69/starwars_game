import urlApi from '../../config/api';
import Api from '../../helpers/api'; 
import history from '../../history';
import { push } from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------

const AUTH = 'auth.AUTH';
const AUTH_SUCCESS = 'auth.AUTH_SUCCESS';
const AUTH_FAILED = 'auth.AUTH_FAILED';

// ------------------------------------
// Actions
// -----------------------------------

export const auth = (data: Object) => (
    (dispatch: Dispatch) => {
        dispatch({ type: AUTH });
        Api.post("EasyClinicUsers/login", {
            data,
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                if(res.status === 200){
                    localStorage.setItem('userId', res.data.id)
                    getData(res.data).then(
                        (result) => {
                            console.log(result)
                            dispatch({
                                type: AUTH_SUCCESS,
                                data: result.data.response[0],
                            });
                            dispatch(push('/home'));
                        }
                    )
                }
                console.log(res)
            })
        .catch(error => {
            alert("Usuário e/ou senha inválidos.")
            console.log(error)
            dispatch({
                type: AUTH_FAILED,
                error: error,
            });
            
        });
    }
);

const getData = (data) => new Promise((resolve, reject) => {
    Api.post(`EasyClinicUsers/getDataForUser`, {
        data,
        header: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }, false).then
        (response => {
            return resolve(response);
        })
    .catch(error => {
        console.log(error)
        return reject(error)
    });
})

// export const auth = (data: Object) => (
//     (dispatch: Dispatch) => {
//         // const auth = `grant_type=password&username=${data.username}&password=${data.password}&client_id=${client_id}&client_secret=${client_secret}`

//         Api.get(urlApi.value + "/PrimaryContacts", {} , true).then
//             (res => {
//                 console.log(res)
//             })
//         .catch(error => {
//             if (!error.response) {
//                 console.log(error)
//             } else {
//                 console.log(error)
//             }
//         });
//     }
// );

export const authActions = {
    auth,
};

export default function authReducer (state, action): ContextState {
    switch (action.type) {
        case AUTH:
            return state
            .setIn(['auth', 'isLoading'], true)
            .setIn(['auth', 'errors'], null);
  
        case AUTH_SUCCESS:
            return state
            .setIn(['auth', 'isLoading'], false)
            .setIn(['auth', 'errors'], null)
            .setIn(['auth', 'data', 'user'], action.data);
  
        case AUTH_FAILED:
            return state
            .setIn(['auth', 'isLoading'], false)
            .setIn(['auth', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}