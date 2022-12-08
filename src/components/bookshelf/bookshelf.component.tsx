import BookItem, { BookItemProps } from '../book-item/book-item.component';
import './bookshelf.component.css';

type BookshelfProps = {
  title: string,
  bookItems: BookItemProps[],
}

const Bookshelf = ({ title, bookItems }: BookshelfProps) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {bookItems.map((bookItem) => {
          return <li>
            <BookItem onBookshelfChange={bookItem.onBookshelfChange} status={bookItem.status} bookId={bookItem.bookId} title={bookItem.title} author={bookItem.author} imgUrl={bookItem.imgUrl} />
          </li>
        })}
      </ol>
    </div>
  </div>
)

export default Bookshelf;