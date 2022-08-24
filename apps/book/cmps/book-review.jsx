export class BookReview extends React.Component {

    render() {
        const { review, remove } = this.props
        const { name, rate, date, text } = review
        return <section className="review-container">
            <h1 className="review-header">{name}</h1>
            <button className="btn-delete-review" onClick={() => remove()}>X</button>
            <p className="review-rate">Rating: {rate}</p>
            <p className="review-date">Date of read: {date}</p>
            <p className="review-text">review: {text}</p>
        </section>
    }
}