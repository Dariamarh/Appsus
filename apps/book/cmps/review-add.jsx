import { bookService } from "../services/book.service.js";

export class ReviewAdd extends React.Component {

    state = {
        name: 'Books Reader',
        rate: 3,
        date: bookService.getCurrDate(),
        text: 'No text yet'
    }

    saveReview = (ev) => {
        ev.preventDefault()
        const { name, rate, date, text } = this.state
        const { close, book } = this.props
        if (!book.reviews) book.reviews = []
        const { id, reviews } = book
        bookService.addReview(name, rate, date, text, id, reviews)
        close()
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value

        this.setState((prevState) => ({
            ...prevState,
            [field]: value
        }), () => { console.log('review', this.state) })
    }

    render() {
        const { name, rate, date, text } = this.state
        return <section className="book-review-container">
            <form onSubmit={this.handleChange} className="book-review-form">
                <label htmlFor="name-input-review">Name :</label>
                <input
                    type="text"
                    className="input-review"
                    id="name-input-review"
                    name="name"
                    value={name}
                    onChange={this.handleChange}

                />

                <label htmlFor="rate-input-review">Rate (1-5):</label>
                <input
                    type="number"
                    min="0"
                    max="5"
                    className="input-review"
                    id="rate-input-review"
                    name="rate"
                    value={rate}
                    onChange={this.handleChange}

                />

                <label htmlFor="date-input-review">Date-Picker:</label>
                <input
                    type="date"
                    placeholder="set max price.."
                    className="input"
                    id="date-input-review"
                    name="date"
                    value={date}
                    onChange={this.handleChange}

                />

                <label htmlFor="text-input-review">Enter your review</label>
                <input
                    type="text"
                    id="text-input-review"
                    name="text"
                    value={text}
                    onChange={this.handleChange}

                />

                <button onClick={this.saveReview}>Add review!</button>
            </form>
        </section>
    }
}