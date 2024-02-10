import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

const initialState = {}

const middleware = [thunk];



const store = createStore(
    reducers,
    initialState,
        
    compose(applyMiddleware(...middleware))
);

export type AppDispatch = typeof store.dispatch;
export default store;






