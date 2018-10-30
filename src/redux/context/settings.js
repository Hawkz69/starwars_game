import urlApi from '../../config/api';
import Api from '../../helpers/api'; 
import history from '../../history';
import { push } from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------

const CONFIG_CLINIC = 'settings.CONFIG_CLINIC';
const CONFIG_CLINIC_SUCCESS = 'settings.CONFIG_CLINIC_SUCCESS';
const CONFIG_CLINIC_FAILED = 'settings.CONFIG_CLINIC_FAILED';

const CONFIG_USER = 'settings.CONFIG_USER';
const CONFIG_USER_SUCCESS = 'settings.CONFIG_USER_SUCCESS';
const CONFIG_USER_FAILED = 'settings.CONFIG_USER_FAILED';

const GET_ZIPCODE = 'settings.GET_ZIPCODE';
const GET_ZIPCODE_SUCCESS = 'settings.GET_ZIPCODE_SUCCESS';
const GET_ZIPCODE_FAILED = 'settings.GET_ZIPCODE_FAILED';

// ------------------------------------
// Actions
// -----------------------------------

export const updateConfigClinic = (data: Object) => (
    (dispatch: Dispatch) => {
        dispatch({ type: CONFIG_CLINIC });
        Api.post("Clinics/updateClinicData", {
            data,
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                if(res.data.response.status === 200){
                    dispatch({
                        type: CONFIG_CLINIC_SUCCESS,
                        data: {
                            status: res.data.response.status,
                            oficialName: data.oficialName,
                            phone: data.phone,
                            mobilePhone: data.mobilePhone,
                            zipcode: data.zipcode,
                            address: data.address,
                            city: data.city,
                            number: data.number,
                            state: data.state,
                            district: data.district,
                            email: data.email,
                            msg: res.data.response.msg,
                            sendEmailBirthday: data.sendEmailBirthday,
                            sendEmailReminber: data.sendEmailReminber
                        },
                    });
                } else if(res.data.response.status === 401) {
                    dispatch({
                        type: CONFIG_CLINIC_SUCCESS,
                        data: {
                            status: res.data.response.status,
                            msg: res.data.response.msg
                        },
                    });
                }
            })
        .catch(error => {
            dispatch({
                type: CONFIG_CLINIC_FAILED,
                error: error,
            });
            
        });
    }
);


export const updateConfigUser = (data: Object) => (
    (dispatch: Dispatch) => {
        dispatch({ type: CONFIG_USER });
        Api.post("EasyClinicUsers/updateUserData", {
            data,
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                console.log(res)
                if(res.data.response.status === 200){
                    dispatch({
                        type: CONFIG_USER_SUCCESS,
                        data: {
                            status: 200,
                            name: data.name,
                            mobile: data.mobile,
                            photoProfile: data.photoProfile,
                            msg: res.data.response.msg
                        },
                    });
                } else if(res.data.response.status === 401) {
                    dispatch({
                        type: CONFIG_USER_SUCCESS,
                        data: {
                            status: res.data.response.status,
                            msg: res.data.response.msg
                        },
                    });
                }
            })
        .catch(error => {
            dispatch({
                type: CONFIG_CLINIC_FAILED,
                error: error,
            });
            
        });
    }
);




export const getZipCode = (zipCode: Object) => (
    (dispatch: Dispatch) => {
        let newZipCode = zipCode.replace(/[\.-]/g, "");
        const data = {
            zipCode: newZipCode
        }
        dispatch({ type: GET_ZIPCODE });
        Api.post("Clinics/searchZipCode", {
            data,
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                console.log(res)
                if(res.data.response.status === 200){
                    dispatch({
                        type: GET_ZIPCODE_SUCCESS,
                        data: {
                            status: null,
                            msg: res.data.response.msg,
                            address: res.data.response.data.logradouro,
                            zipcode: res.data.response.data.cep,
                            city: res.data.response.data.localidade,
                            district: res.data.response.data.bairro,
                            state: res.data.response.data.uf
                        },
                    });
                } else {
                    dispatch({
                        type: GET_ZIPCODE_SUCCESS,
                        data: {
                            status: res.data.response.status,
                            msg: res.data.response.msg,
                            address: '',
                            zipcode: '',
                            city: '',
                            district: '',
                            state: ''
                        },
                    });
                }
            })
        .catch(error => {
            console.log(error)
            dispatch({
                type: GET_ZIPCODE_FAILED,
                error: error,
            });
            
        });
    }
);

export const settingsActions = {
    updateConfigClinic,
    updateConfigUser,
    getZipCode
};

export default function settingsReducer (state, action): ContextState {
    switch (action.type) {
        case CONFIG_CLINIC:
            return state
            .setIn(['settings', 'isLoading'], true)
            .setIn(['settings', 'errors'], null);
  
        case CONFIG_CLINIC_SUCCESS:
            return state
            .setIn(['settings', 'isLoading'], false)
            .setIn(['settings', 'errors'], null)
            .setIn(['settings', 'data', 'clinics'], action.data)
            .setIn(['auth', 'data', 'user', 'Clinics'], action.data);
  
        case CONFIG_CLINIC_FAILED:
            return state
            .setIn(['settings', 'isLoading'], false)
            .setIn(['settings', 'errors'], [action.error.message]);


        case CONFIG_USER:
            return state
            .setIn(['settings', 'isLoading'], true)
            .setIn(['settings', 'errors'], null);
  
        case CONFIG_USER_SUCCESS:
            return state
            .setIn(['settings', 'isLoading'], false)
            .setIn(['settings', 'errors'], null)
            // .setIn(['settings', 'data', 'clinics'], action.data)
            .setIn(['auth', 'data', 'user', 'name'], action.data.name)
            .setIn(['auth', 'data', 'user', 'mobile'], action.data.mobile)
            .setIn(['auth', 'data', 'user', 'photoProfile'], action.data.photoProfile)
            .setIn(['auth', 'data', 'user', 'status'], action.data.status)
            .setIn(['auth', 'data', 'user', 'msg'], action.data.msg);
  
        case CONFIG_USER_FAILED:
            return state
            .setIn(['settings', 'isLoading'], false)
            .setIn(['settings', 'errors'], [action.error.message]);


        case GET_ZIPCODE:
            return state
            .setIn(['settings', 'isLoading'], true)
            .setIn(['settings', 'errors'], null);
  
        case GET_ZIPCODE_SUCCESS:
            return state
            .setIn(['settings', 'isLoading'], false)
            .setIn(['settings', 'errors'], null)
            // .setIn(['settings', 'data', 'clinics', 'address'], action.data.address)
            .setIn(['auth', 'data', 'user', 'Clinics', 'status'], action.data.status)
            .setIn(['auth', 'data', 'user', 'Clinics', 'msg'], action.data.msg)
            .setIn(['auth', 'data', 'user', 'Clinics', 'address'], action.data.address)
            .setIn(['auth', 'data', 'user', 'Clinics', 'zipcode'], action.data.zipcode)
            .setIn(['auth', 'data', 'user', 'Clinics', 'district'], action.data.district)
            .setIn(['auth', 'data', 'user', 'Clinics', 'city'], action.data.city)
            .setIn(['auth', 'data', 'user', 'Clinics', 'state'], action.data.state);
  
        case GET_ZIPCODE_FAILED:
            return state
            .setIn(['settings', 'isLoading'], false)
            .setIn(['settings', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}