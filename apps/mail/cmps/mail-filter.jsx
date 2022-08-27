export class MailFilter extends React.Component {

    state = {
        filterBy: ''
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({ filterBy: value }, () => {
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
        const { filterBy } = this.state
        const { getFilter, handleChange } = this

        return <section className="mail-filter">
            <form onSubmit={getFilter} >
                <input className="search-mail"
                    type="search"
                    id="searchMail"
                    placeholder="Search in emails"
                    defaultValue={filterBy}
                    onChange={handleChange}
                />
            </form>
        </section>
    }
}