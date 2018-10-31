import urlApi from '../../config/api';
import Api from '../../helpers/api'; 
import history from '../../history';
import { push } from 'react-router-redux'
// ------------------------------------
// Constants
// ------------------------------------

const GAME = 'game.GAME';
const GAME_SUCCESS = 'game.GAME_SUCCESS';
const GAME_FAILED = 'game.GAME_FAILED';

// ------------------------------------
// Actions
// -----------------------------------

export const game = (data: Object) => (
    (dispatch: Dispatch) => {
    
    }
);



export const gameActions = {
    game,
};

export default function gameReducer (state, action): ContextState {
    switch (action.type) {
        case GAME:
            return state
            .setIn(['game', 'isLoading'], true)
            .setIn(['game', 'errors'], null);
  
        case GAME_SUCCESS:
            return state
            .setIn(['game', 'isLoading'], false)
            .setIn(['game', 'errors'], null)
            .setIn(['game', 'data', 'user'], action.data);
  
        case GAME_FAILED:
            return state
            .setIn(['game', 'isLoading'], false)
            .setIn(['game', 'errors'], [action.error.message]);
  
        default:
            return state;
    }
}