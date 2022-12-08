import { BookModelUI } from "../models/book.model";

export const updateBookListAction = (data: BookModelUI[]) => {
  return { type: 'updateBookList', data }

}
export const updateSearchBookListAction = (data: BookModelUI[]) => {
  return { type: 'updateSearchBookList', data }

}
