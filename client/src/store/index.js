import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import AccountReducer from './AccountReducer'
import Hr_Reducer from './Hr_Reducer';

const { composeWithDevTools } = require("redux-devtools-extension");


const reducer = combineReducers({
    account: AccountReducer,
    hr_data: Hr_Reducer

})
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: composeWithDevTools,
})
export default store;