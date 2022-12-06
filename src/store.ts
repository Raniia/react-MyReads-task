import { legacy_createStore as createStore} from 'redux';
import { BookModelUI } from './models/book.model';
import { bookReducer } from './reducers/book.reducer';

export interface State {
    bookList: BookModelUI[],
    searchBooklist: BookModelUI[],
}
export const store = createStore(bookReducer);
