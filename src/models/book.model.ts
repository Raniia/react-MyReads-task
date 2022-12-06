export interface BookModel {
    title: string;
    subtitle: string;
    authors: string[];
    id: string;
    shelf: string;
    imageLinks: {
        smallThumbnail: string,
        thumbnail: string
    },
}

export interface BookModelUI {
    bookId: string;
    title: string;
    author: string;
    imgUrl: string;
    status: string;
}