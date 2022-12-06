import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { State } from "../../store";
import { BookModelUI } from "../../models/book.model";
import { DebounceInput } from 'react-debounce-input';
import { search, update } from "../../BooksAPI";
import BookItem from "../book-item/book-item.component";
import { useEffect } from "react";
import './search.component.css';

type SearchBooklistProps = {
  searchBooklist: BookModelUI[],
  updateSearchBookList: (searchBookList: BookModelUI[]) => void,
}
const Search: React.FC<SearchBooklistProps> = ({ searchBooklist, updateSearchBookList}: SearchBooklistProps) => {
  useEffect(() => {
    return () => {
        updateSearchBookList([])
    }
}, [])

  function findSearch(value: string) {
    search(value, 20).then((response) => {
      updateSearchBookList(response)
    }
    )
  }
  function onBookshelfChange(value: string, bookId: string) {
    update(bookId, value).then((response) => {
     updateSearchBookList(searchBooklist.filter((book) => !(book.bookId == bookId && value != 'none')))
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


const mapStateToProps = (state: State) => {
  return {
    searchBooklist: state.searchBooklist,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSearchBookList: (searchBooklist: BookModelUI[]) => dispatch({ type: 'updateSearchBookList', data: searchBooklist }),

  }
};
const SearchBookListContainer = connect(mapStateToProps, mapDispatchToProps)(Search);
export default SearchBookListContainer;
