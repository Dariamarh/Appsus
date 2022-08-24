import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'

export class MailIndex extends React.Component {
    state = {
        emails: [],
        sortBy: null,
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

    componentDidMount() {
        this.loadMails()

    }

    loadMails = () => {
        this.setState({ emails: mailService.query() })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    };

    getFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state)
        this.clearForm()
    }
    clearForm = () => {
        this.setState({ mailSearch: '' })
      }
    

    render() {
        const { emails, mailSearch } = this.state

        return (
            <section className="mail-index">
                <form onSubmit={this.getFilter} className="search-mail">
                    {/* <label htmlFor="search"></label> */}
                    <input
                        type="search"
                        id="searchMail"
                        placeholder="Search in emails"
                        value={mailSearch}
                        onChange={this.handleChange}
                    />
                </form>
                <MailList emails={emails} />
                {/* <MailFilter onSetFilter={this.onSetFilter} /> */}

            </section>
        )
    }
}
