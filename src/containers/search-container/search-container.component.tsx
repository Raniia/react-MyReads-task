import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from "../../store/store";
import { BookModelUI } from "../../models/book.model";
import { DebounceInput } from 'react-debounce-input';
import { search, update } from "../../BooksAPI";
import { useEffect } from "react";
import './search-container.component.css';
import BookItem from "../../components/book-item/book-item.component";
import { updateSearchBookListAction } from "../../actions/book.action";


const SearchBookListContainer: React.FC = () => {
  const searchBooklist = useSelector((state: State) => state.books.searchBooklist);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    return () => {
        dispatch(updateSearchBookListAction(([])));
    }
}, [])

  function findSearch(value: string) {
    search(value, 20).then((response) => {
      dispatch(updateSearchBookListAction((response)))
    }
    )
  }
  function onBookshelfChange(value: string, bookId: string) {
    update(bookId, value).then((response) => {
     dispatch(updateSearchBookListAction((searchBooklist.filter((book) => !(book.bookId == bookId && value != 'none')))))
    })
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            onChange={event => findSearch(event.target.value)}
            placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {searchBooklist.map((bookItem: BookModelUI) => {
          return <li>
            <BookItem onBookshelfChange={onBookshelfChange} status={bookItem.status} bookId={bookItem.bookId} title={bookItem.title} author={bookItem.author} imgUrl={bookItem.imgUrl} />
          </li>
        })}
        </ol>
      </div>
    </div>
  )
}


export default SearchBookListContainer;
