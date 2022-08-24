import { LongTxt } from '../cmps/long-txt.jsx'
import { ReviewAdd } from '../cmps/review-add.jsx'
import { ReviewsList } from '../cmps/reviews-list.jsx'
import { bookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {
    state = {
        isLongTxtShown: null,
        isLongTxt: null,
        book: null,
        isAddReview: null,
    }

    componentDidMount() {
        this.loadBook()
        bookService
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getById(bookId)
            .then((book) => {
                this.setState({ book })
                const { description } = book
                this.checkTxt(description)
            })
    }

    // Description Format Functions
    checkTxt(txt) {
        if (txt.length > 100) {
            this.setState({ isLongTxt: true })
        } else {
            this.setState({ isLongTxt: false })
        }

    }

    getShortTxt = (txt) => {
        if (txt.split(' ').length < 100) {
            return txt
        }
        const shortTxt = txt.split(' ')
        shortTxt.splice(100, shortTxt.length - 1)
        return shortTxt.join(' ') + '....'
    }

    // Price Format Functions
    getPriceColor({ amount }) {
        if (amount > 150) return 'red'
        else if (amount < 20) return 'green'
        else return ''
    }

    getOnSaleSymbol({ isOnSale }) {
        if (isOnSale) return '💲'
    }

    // Other formats
    getFormattedPageCount = (pageCount) => {
        if (pageCount > 500) { return pageCount + '- Long reading' }
        else if (pageCount > 200) { return pageCount + '- Decent reading' }
        else if (pageCount < 100) { return pageCount + '- Light reading' }
        else { return pageCount }
    }

    getFormattedDate = (date) => {
        const currTime = new Date
        const currYear = currTime.getFullYear()
        if ((currYear - date) > 10) { return date + ' - Veteran Book' }
        else if ((currYear - date) < 1) { return date + ' - New!' }
        else { return date }
    }

    // Toggle Functions
    toggleTxt = () => {
        const { isLongTxtShown } = this.state
        this.setState({ isLongTxtShown: !isLongTxtShown })
    }

    toggleReviewEditor = () => {
        const { isAddReview } = this.state
        this.setState({ isAddReview: !isAddReview })
    }

    render() {
        const { isLongTxtShown, isLongTxt, isAddReview, book } = this.state
        const { bookId } = this.props.match.params
        const nextBookId = bookService.getNextbookId(bookId)
        const prevBookId = bookService.getPrevbookId(bookId)
        if (!book) return <div>Loading...</div>

        const { title, subtitle, authors,
            publishedDate, description, pageCount,
            categories, language, listPrice, thumbnail } = book

            console.log('book', book)
        return <section className="book-details-container">
            <div className="book-details flex">
                <div className="text-book-details">


                    <h1 className="book-header">{title}</h1>
                    <p className="details-subtitle">Subtitle: {subtitle}</p>
                    <p className="details-authors">{authors}</p>
                    <p className="details-publish-at">{this.getFormattedDate(publishedDate)}</p>

                    {!isLongTxtShown && <p className="details-description">
                        Description:{this.getShortTxt(description)}
                        {isLongTxt && <span className="span-toggle-txt" onClick={this.toggleTxt}>Show more</span>}
                    </p>}


                    {isLongTxtShown && <LongTxt text={description} toggleTxt={this.toggleTxt} isLongTxtShown={isLongTxtShown} />}


                    <p className="details-pageCount">{this.getFormattedPageCount(pageCount)}</p>
                    <p className="details-categories">{categories}</p>
                    <p className="details-language">{language}</p>
                    <p className={"details-price " + this.getPriceColor(listPrice)}>
                        {bookService.getFormattedPrice(listPrice)}
                        {this.getOnSaleSymbol(listPrice)}
                    </p>

                    <button className="btn-add-review" onClick={this.toggleReviewEditor}>Add Review!</button>
                    {isAddReview && <ReviewAdd close={this.toggleReviewEditor} book={book} />}
                </div>


                <div className="img-book-details">
                    <img src={thumbnail} alt="" />
                </div>
            </div>
            <ReviewsList book={book} />

            <Link to="/book">
                <button
                    className="btn-close-details"
                >Full book list</button>
            </Link>


            <Link to={`/book/${prevBookId}`}>
                <button
                    className="btn-prev-book"
                >Previous Book</button>
            </Link>

            {/* <button onClick={() => bookService.onNextPage('HhtbzgEACAAJ')}>check switch</button> */}

            <Link to={`/book/${nextBookId}`}>
                <button
                    className="btn-next-book"
                >Next Book</button>
            </Link>

        </section>
    }
}