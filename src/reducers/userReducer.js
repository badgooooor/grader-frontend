import { USER_AUTHEN } from '../actions/types';

const initialState = {
    authed: false
}

export default function(state = initialState, action) {
    switch(action.type) {

        default:
            return state;
    }
}