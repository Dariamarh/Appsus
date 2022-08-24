import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolders } from "../cmps/mail-folders.jsx"

export class MailIndex extends React.Component {
    state = {
        emails: [],
        sortBy: null,
        
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
   

    render() {
        const { emails, mailSearch } = this.state
        const { onSetFilter,getFilter } = this
        return (
            <section className="mail-index">
                
                <MailFilter onSetFilter={onSetFilter} />
                <MailFolders />
                <MailList emails={emails} />

            </section>
        )
    }
}
