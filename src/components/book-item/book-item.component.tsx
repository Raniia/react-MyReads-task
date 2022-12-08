import './book-item.component.css';

export type BookItemProps = {
  bookId: string,
  title: string,
  author: string,
  imgUrl: string,
  status: string,
  onBookshelfChange: (value: string, bookId: string) => void 
}

const BookItem = ({ bookId, title, author, imgUrl, status, onBookshelfChange }: BookItemProps) => (
    <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage:
            `url(${imgUrl})`,
        }}
      ></div>
      <div className="book-shelf-changer">
        <select data-testid="select" onChange={(event)=> {
          onBookshelfChange(event.target.value, bookId)
        }}>
          <option data-testid="select-option" value="none" disabled>
            Move to...
          </option>
          <option data-testid="select-option"  selected={status == 'currentlyReading'} value="currentlyReading">
            Currently Reading
          </option>
          <option data-testid="select-option" selected={status == 'wantToRead'}  value="wantToRead">Want to Read</option>
          <option data-testid="select-option" selected={status == 'read'}  value="read">Read</option>
          <option data-testid="select-option" selected={status == 'none' || !status} value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{title}</div>
    <div className="book-authors">{author}</div>
    </div>
)

export default BookItem;