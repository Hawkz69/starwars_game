import Immutable from 'seamless-immutable';
import _ from 'lodash';
import gameReducer from './context/game';
import filmsReducer from './context/films';



export default function contextReducer(passedState: ContextState = Immutable({}), action: Action) {
    const state = _.reduce([
        gameReducer,
        filmsReducer
    ], (s, reducer) => reducer(s, action), passedState);
  
    
    switch (action.type) {  
        default:
            return state;
    }
}