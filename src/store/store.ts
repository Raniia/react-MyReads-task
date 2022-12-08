import { combineReducers, legacy_createStore as createStore} from 'redux';
import { BookModelUI } from '../models/book.model';
import { bookReducer } from '../reducers/book.reducer';
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {historyBrowser, historyMiddleware} from './middlewares/history'
import {connectRouter} from 'connected-react-router'
export interface State {
    books: {
        bookList: BookModelUI[],
        searchBooklist: BookModelUI[],
    }
}
export type AppDispatch = typeof store.dispatch;
const storeReducers = combineReducers({
    books: bookReducer,
    router: connectRouter(historyBrowser),
});
export const store = createStore(storeReducers, compose(applyMiddleware(thunk, historyMiddleware)));