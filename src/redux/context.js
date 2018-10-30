import Immutable from 'seamless-immutable';
import _ from 'lodash';
import authReducer from './context/auth';
import settingsReducer from './context/settings';



export default function contextReducer(passedState: ContextState = Immutable({}), action: Action) {
    const state = _.reduce([
        authReducer,
        settingsReducer
    ], (s, reducer) => reducer(s, action), passedState);
  
    switch (action.type) {  
        default:
            return state;
    }
}