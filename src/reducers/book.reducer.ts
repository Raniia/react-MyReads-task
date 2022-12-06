import { BookModelUI } from "../models/book.model";

export const bookReducer = function (state = {}, action: {type: string, data: BookModelUI}) {
    switch (action.type) {
        case "updateBookList":
            return { ...state, bookList: action.data };
        case "updateSearchBookList":
            return { ...state, searchBooklist: action.data };
        default:
            return { ...state, bookList: [], searchBooklist: [] };
    }
};