import { BookModel, BookModelUI } from '../models/book.model';

function mapToUI(bookModel: BookModel): BookModelUI {
  return {
    bookId: bookModel.id,
    title: bookModel.title,
    author: bookModel.authors && bookModel.authors.join(','),
    imgUrl: bookModel.imageLinks.thumbnail,
    status: bookModel.shelf,
  };
}
function mapToUIList(bookModelList: BookModel[]): BookModelUI[] {
  return Array.isArray(bookModelList)? bookModelList.map(mapToUI): [];
}
export default {
  mapToUI, mapToUIList
};