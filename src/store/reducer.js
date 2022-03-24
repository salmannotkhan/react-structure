import { SET_USER } from "./actionTypes";

const initialState = {
    currentUser: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
};
