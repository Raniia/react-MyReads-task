import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAll, update } from "../../BooksAPI";
import { BookModelUI } from "../../models/book.model";
import { AppDispatch, State } from "../../store/store";
import './book-list-container.component.css';
import Bookshelf from "../../components/bookshelf/bookshelf.component";
import { useDispatch, useSelector } from 'react-redux'
import { updateBookListAction } from "../../actions/book.action";


const BookListContainer: React.FC = () => {
  const bookList = useSelector((state: State) => state.books.bookList);
  const dispatch = useDispatch<AppDispatch>();
  const [booksCurrentlyReading, setAllBooksCurrentlyReading] = useState<BookModelUI[]>([]);
  const [booksRead, setAllBooksRead] = useState<BookModelUI[]>([]);
  const [bookWantsToRead, setAllBooksWantToRead] = useState<BookModelUI[]>([]);
  useEffect(() => {
    getAllBooks();
  }, []);
  useEffect(() => {
    // getAllBooks();
    setAllBooksCurrentlyReading(bookList.filter((item: BookModelUI) => item.status == 'currentlyReading'));
    setAllBooksWantToRead(bookList.filter((item: BookModelUI) => item.status == 'wantToRead'));
    setAllBooksRead(bookList.filter((item: BookModelUI) => item.status == 'read'));
  }, [bookList]);


  function onBookshelfChange(value: string, bookId: string) {
    update(bookId, value).then((response) => {
      let bookListUpdated = bookList;
      // getAllBooks();
      response.currentlyReading.forEach((id: string) => {
        bookListUpdated = bookList.map((res: BookModelUI) => {
          if (res.bookId == id) {
            res.status = 'currentlyReading'
          }
          return res;
        })
      });
      response.wantToRead.forEach((id: string) => {
        bookListUpdated = bookList.map((res: BookModelUI) => {
          if (res.bookId == id) {
            res.status = 'wantToRead'
          }
          return res;
        })
      });
      response.read.forEach((id: string) => {
        bookListUpdated = bookList.map((res: BookModelUI) => {
          if (res.bookId == id) {
            res.status = 'read'
          }
          return res;
        })
      });
      dispatch(updateBookListAction(bookListUpdated.filter((book) => !(book.bookId == bookId && value == 'none'))));
    })
  }
  function getAllBooks() {
    getAll().then((response) => {
      dispatch(updateBookListAction(response));
    }
    )
  }

  return (<div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>


        <Bookshelf title="Currently Reading" bookItems={booksCurrentlyReading.map((item) => ({ ...item, onBookshelfChange }))} />
        <Bookshelf title="Want to Read" bookItems={bookWantsToRead.map((item) => ({ ...item, onBookshelfChange }))} />
        <Bookshelf title="Read" bookItems={booksRead.map((item) => ({ ...item, onBookshelfChange }))} />


      </div>
    </div>
    <div className="open-search">

      <Link to="/search">Add a book</Link>

    </div>
  </div>)
}


export default BookListContainer;