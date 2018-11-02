import Api from '../../helpers/api'; 
// ------------------------------------
// Constants
// ------------------------------------

const GET_PERSONS = 'game.GET_PERSONS';
const GET_PERSONS_SUCCESS = 'game.GET_PERSONS_SUCCESS';
const GET_PERSONS_FAILED = 'game.GET_PERSONS_FAILED';

const SAVE_PERSONS_SUCCESS = 'game.SAVE_PERSONS_SUCCESS'

// ------------------------------------
// Actions
// -----------------------------------

export const getPersons = (page: String) => (
    (dispatch: Dispatch) => {
        dispatch({ type: GET_PERSONS });
        Api.get(`people/?page=${page}`, {
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                console.log(res);
                if(res.status === 200){
                    dispatch({
                        type: GET_PERSONS_SUCCESS,
                        data: res,
                        page,
                    });
                }
            })
        .catch(error => {
            dispatch({
                type: GET_PERSONS_FAILED,
                error: error,
            });
            
        });
    }
);

export const savePersons = (persons: String) => (
    (dispatch: Dispatch) => {
        dispatch({
            type: SAVE_PERSONS_SUCCESS,
            persons,
        });        
    }
);



export const gameActions = {
    getPersons,
    savePersons
};

export default function gameReducer (state, action): ContextState {
    switch (action.type) {
        case GET_PERSONS:
            return state
            .setIn(['game', 'isLoading'], true)
            .setIn(['game', 'errors'], null);

        case SAVE_PERSONS_SUCCESS:
            return state
            .setIn(['game', 'persons'], action.persons);
  
        case GET_PERSONS_SUCCESS:
            return state
            .setIn(['game', 'isLoading'], false)
            .setIn(['game', 'errors'], null)
            .setIn(['game', 'data'], action.data)
            .setIn(['game', 'data', 'persons'], action.data.data.results);
  
        case GET_PERSONS_FAILED:
            return state
            .setIn(['game', 'isLoading'], false)
            .setIn(['game', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}