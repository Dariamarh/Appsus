const { Link } = ReactRouterDOM
import { bookService } from "../services/book.service.js"

export function BookPreview({ book }) {
    const { listPrice } = book
    return <Link to={"/book/" + book.id}
        style={{ textDecoration: 'none', color: 'black' }}>
        <div className="book-preview"
            key={`book-container-${book.id}`}>
            <h1 className="preview-book-title">{book.title}</h1>
            <p className="preview-authors"> Authors: {book.authors}</p>
            <p className="preview-price">{bookService.getFormattedPrice(listPrice)}</p>
            <div className="img-book-preview">
                <img src={book.thumbnail} alt="" />
            </div>
        </div>
    </Link>
}