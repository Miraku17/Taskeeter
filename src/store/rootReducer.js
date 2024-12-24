import { combineReducers } from '@reduxjs/toolkit';

// Even if you don't have reducers yet, provide an empty one
const dummyReducer = (state = {}, action) => state;

const rootReducer = combineReducers({
    dummy: dummyReducer
    // add your real reducers here later
});

export default rootReducer;