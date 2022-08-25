export class MailFilter extends React.Component {

    state = {
        filterBy: {
            txt: null,
            to: null,
            subject: null,
            from: null,
            body: null,
            dateFrom: null,
            dateTo: null,
            state: 'inbox',
            starred: false,
            mailSearch: ''
        },
    }
    inputRef = React.createRef()

    componentDidMount() {
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    getFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.clearForm()
    }

    clearForm = () => {
        this.setState({ mailSearch: '' })
    }

    render() {
        const { subject, getFilter, body } = this.state.filterBy

        return <section className="mail-filter">
            <form onSubmit={getFilter} >
                <label htmlFor="search"></label>
                <input className="search-mail"
                    type="search"
                    id="searchMail"
                    placeholder=" Search in emails"
                    value={getFilter}
                    onChange={this.handleChange}
                />

            </form>
        </section>
    }
}