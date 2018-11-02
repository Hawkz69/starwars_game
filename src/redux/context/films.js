import Api from '../../helpers/api'; 
// ------------------------------------
// Constants
// ------------------------------------

const GET_FILMS = 'films.GET_FILMS';
const GET_FILMS_SUCCESS = 'films.GET_FILMS_SUCCESS';
const GET_FILMS_FAILED = 'films.GET_FILMS_FAILED';

const SAVE_FILMS_SUCCESS = 'films.SAVE_FILMS_SUCCESS'

// ------------------------------------
// Actions
// -----------------------------------

export const getFilms = () => (
    (dispatch: Dispatch) => {
        dispatch({ type: GET_FILMS });
        Api.get('films', {
            header: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        } , true).then
            (res => {
                if(res.status === 200){
                    dispatch({
                        type: GET_FILMS_SUCCESS,
                        data: res
                    });
                }
            })
        .catch(error => {
            dispatch({
                type: GET_FILMS_FAILED,
                error: error,
            });
            
        });
    }
);

/* Coloca no state do redux as informações organizadas */ 
export const saveFilms = (films: String) => (
    (dispatch: Dispatch) => {
        dispatch({
            type: SAVE_FILMS_SUCCESS,
            films,
        });        
    }
);



export const filmsActions = {
    getFilms,
    saveFilms
};

export default function filmsReducer (state, action): ContextState {
    switch (action.type) {
        case GET_FILMS:
            return state
            .setIn(['films', 'isLoading'], true)
            .setIn(['films', 'errors'], null);

        case SAVE_FILMS_SUCCESS:
            return state
            .setIn(['films', 'films'], action.films);
  
        case GET_FILMS_SUCCESS:
            return state
            .setIn(['films', 'isLoading'], false)
            .setIn(['films', 'errors'], null)
            .setIn(['films', 'data',], action.data)
  
        case GET_FILMS_FAILED:
            return state
            .setIn(['films', 'isLoading'], false)
            .setIn(['films', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}