import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

export class BookAdd extends React.Component {

    state = {
        googleBooks: null
    }

    handleChange = ({ target }) => {
        bookService.findGoogleBooks(target.value)
            .then((res) => {
                this.setState({ googleBooks: res })
            })
    }

    clearSearch = ({ target }) => {
        target.value = ''
        this.setState({ googleBooks: null })
    }

    render() {
        const { googleBooks } = this.state
        const { debounce } = utilService
        const { handleChange, clearSearch } = this
        return <section className="search-container">
            <div className="label-container">

                <label htmlFor="google-books"
                    className="search-label">Search <img
                        src="assets/img/googlelogo_color_92x30dp.png"
                        className="google-pic"
                    /> for books:</label>
            </div>

            <br />
            <input
                type="search"
                name="google-books"
                id="google-books"
                className="search-bar"
                onBlur={debounce(clearSearch, 500)}
                onChange={debounce(handleChange, 1000)}
            />

            {googleBooks && <ul className="google-book-container">
                {googleBooks.items.map(book => {
                    const { volumeInfo, id } = book
                    const { title } = volumeInfo
                    return <li key={id}
                        className="google-book">
                        {title}
                        <i class="fa-solid fa-circle-plus btn-add-book" onClick={() => this.props.onAddBook(volumeInfo, id)}></i>
                    </li>
                })}
            </ul>
            }
        </section>
    }
}