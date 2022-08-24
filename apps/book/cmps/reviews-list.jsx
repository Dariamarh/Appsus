import { BookReview } from "./book-review.jsx"
import { storageService } from "../../../services/storage.service.js"

export class ReviewsList extends React.Component {
    state = {
        book: this.props.book
    }

    reomoveReview = () => {
        const { reviews, id } = this.props.book
        let currIdx = reviews.findIndex(review => review.id === id)
        reviews.splice(currIdx, 1)
        storageService.saveToStorage('review-' + id, reviews)
        this.setState({ reviews })
    }

    render() {
        const { book } = this.props
        const { id } = book
        book.reviews = storageService.loadFromStorage('review-' + id) || []
        const { reviews } = book

        return <section className="reviews-container">
            {!reviews.length && <div className="no-reviews-container">No reviews for now...</div>}
            {reviews.length > 0 && <div className="reviews-gallery">
                {reviews.map(review => {
                    return (
                        <BookReview
                            remove={this.reomoveReview}
                            key={review.id}
                            bookId={id}
                            reviews={reviews}
                            review={review} />
                    )
                })}
            </div>}
        </section>
    }
}