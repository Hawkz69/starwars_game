// ------------------------------------
// Constants
// ------------------------------------

const AUTH = 'auth.AUTH';
const AUTH_SUCCESS = 'auth.AUTH_SUCCESS';
const AUTH_FAILED = 'auth.AUTH_FAILED';

// ------------------------------------
// Actions
// -----------------------------------

export const auth = () => (
    (dispatch) => {
        console.log("Chamo action")
        dispatch({
            type: AUTH_SUCCESS,
            userId: 2,
            auth: {'name' : 'teste'},
        });
    }
);

export const authActions = {
    auth,
};

export default function authReducer (state = [], action): ContextState {
    switch (action.type) {
        case AUTH:
            return state
            .setIn(['filters', 'isLoading'], true)
            .setIn(['filters', 'errors'], null);
  
        case FILTER_RESTAURANT:
            return state
            .setIn(['filters', 'restaurant', 'id', action.userId, 'foods'], action.foods);
            .setIn(['filters', 'restaurant', 'id', action.userId, 'data'], action.data);
  
        case AUTH_FAILED:
            return state
            .setIn(['filters', 'isLoading'], false)
            .setIn(['filters', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}