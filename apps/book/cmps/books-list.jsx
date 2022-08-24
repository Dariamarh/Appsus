import { BookPreview } from "./book-preview.jsx"

export function BookList({books}) {
        return <section>
            <div className="books-gallery">
                {books.map(book => <BookPreview
                    key={book.id}
                    book={book}
                />)}
            </div>
        </section>
}
