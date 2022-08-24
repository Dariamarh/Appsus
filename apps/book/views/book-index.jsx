import { bookService } from '../services/book.service.js'
import { storageService } from '../../../services/storage.service.js'
import { BookList } from '../cmps/books-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookAdd } from '../cmps/book-add.jsx'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

export class BookIndex extends React.Component {

    state = {
        books: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then((books) => this.setState({ books }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadBooks()
        })
    }

    onAddBook = (book, id) => {
        const { loadFromStorage } = storageService
        const books = loadFromStorage('booksDB')
        if (books.find(book => id === book.id)) return alert('This book is already added!')

        bookService.addGoogleBook(book, id)
            .then(book => {
                this.setState((prevState) => ({
                    books: [book, ...prevState.books]
                }), () => {
                    const { STORAGE_KEY } = bookService
                    const { books } = this.state
                    storageService.saveToStorage(STORAGE_KEY, books)
                    showSuccessMsg('Book Added', book.id)
                })
            })
    }

    render() {
        const { books } = this.state
        return <section className="book-app">
            <BookAdd onAddBook={this.onAddBook} />
            <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
            <BookList
                books={books}
            />
        </section>
    }
}