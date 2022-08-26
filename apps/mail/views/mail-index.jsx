import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolders } from "../cmps/mail-folders.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"

export class MailIndex extends React.Component {
    state = {
        emails: [],
        loggedInUser: null,
        filterBy: {
            folder: 'inbox'
        },
    }

    componentDidMount() {
        const { folder } = this.props.match.params
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                folder
            }
        }), () => this.loadMails())
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.folder !== this.props.match.params.folder) {
            const { folder } = this.props.match.params
            this.setState((prevState) => ({
                filterBy: {
                    ...prevState.filterBy,
                    folder
                }
            }), () => this.loadMails())
        }
    }
    loadMails = () => {
        this.setState({ emails: mailService.query(this.state.filterBy) })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }
    onToggleIsRead = (emailId, isRead) => {
        mailService.toggleIsRead(emailId, isRead)
            .then(() => {
                let { emails } = this.state
                const emailIdx = emails.findIndex(email => email.id === emailId)
                emails[emailIdx].isRead = true
                this.setState({ emails })
            })
    }

    onRemoveEmail = (emailId) => {
        mailService.remove(emailId)
            .then(() => {
                const emails = this.state.emails.filter(email => email.id !== emailId)
                this.setState({ emails })
            })
            .catch(err => {
            })
    }


    render() {
        const { emails, mailSearch } = this.state
        const { onSetFilter, getFilter, onToggleIsRead, onRemoveEmail } = this
        return (
            <section className="mail-index">
                <div className="search-filter">
                    <MailFilter onSetFilter={onSetFilter} />
                </div>
                <div className="mail-main">
                    <MailFolders />
                    <MailList
                        emails={emails}
                        onRemoveEmail={onRemoveEmail}
                        onToggleIsRead={onToggleIsRead} />

                </div>
            </section>
        )
    }
}
