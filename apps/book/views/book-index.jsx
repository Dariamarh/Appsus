import { bookService } from '../services/book.service.js'
import { storageService } from '../services/storage.service.js'
import { BookList } from '../cmps/books-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookAdd } from '../cmps/book-add.jsx'
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

export class BookIndex extends React.Component {

    // state = {
    //     books: [],
    //     filterBy: null,
    // }

    // componentDidMount() {
    //     this.loadBooks()
    // }

    // loadBooks = () => {
    //     bookService.query(this.state.filterBy)
    //         .then((books) => this.setState({ books }))
    // }

    // onSetFilter = (filterBy) => {
    //     this.setState({ filterBy }, () => {
    //         this.loadBooks()
    //     })
    // }

    // onAddBook = (book, id) => {
    //     bookService.addGoogleBook(book, id)
    //         .then(book => {
    //             this.setState((prevState) => ({
    //                 books: [book, ...prevState.books]
    //             }), () => {
    //                 const { STORAGE_KEY } = bookService
    //                 const { books } = this.state
    //                 storageService.saveToStorage(STORAGE_KEY, books)
    //                 showSuccessMsg('Book Added', book.id)
    //             })
    //         })
    // }

    render() {
        // const { books } = this.state
        return <section className="book-app">
            <p>hello from book index</p>
            {/* <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
            <BookAdd onAddBook={this.onAddBook} />
            <BookList
                books={books}
            /> */}
        </section>
    }
}