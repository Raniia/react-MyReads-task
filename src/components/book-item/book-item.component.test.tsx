import { render, fireEvent} from '@testing-library/react';
import BookItem from './book-item.component';

test('renders the book item', () => {
    const mockedOnBookshelfChange = jest.fn();
    const { container } = render(<BookItem  bookId = '2' title = 'test' author = 'Rania' imgUrl = 'www.123.com' status = '' onBookshelfChange= {mockedOnBookshelfChange}/>);
    expect(container.querySelector('.book-title')?.textContent).toBe('test');
    expect(container.querySelector('.book-authors')?.textContent).toBe('Rania');
});


test('updates bookshelf when changing the shelf', () => {
    const mockedOnBookshelfChange = jest.fn();
    const { getByTestId, getAllByTestId } = render(<BookItem  bookId = '2' title = 'test' author = 'Rania' imgUrl = 'www.123.com' status = '' onBookshelfChange= {mockedOnBookshelfChange}/>);
    fireEvent.change(getByTestId('select'), { target: { value: 'read' } })
      let options: any = getAllByTestId('select-option')
      expect(mockedOnBookshelfChange).toHaveBeenCalled();    
    });
