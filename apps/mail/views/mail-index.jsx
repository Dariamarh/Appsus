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
            body: null,
            dateFrom: null,
            dateTo: null,
            state: 'inbox',
            starred: false,
        },
    }

    componentDidMount() {
        this.loadMails()

    }

    loadMails = () => {
        // mailService
        //     .query(this.state.filterBy)
        //     ((emails) => this.setState({ emails }))
        this.setState({emails:mailService.query()})
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }


    render() {
        const { emails } = this.state

        return (
            <section className="mail-index">
                <p>email</p>
                <MailList emails={emails} />
                {/* <MailFilter onSetFilter={this.onSetFilter} /> */}

            </section>
        )
    }
}
