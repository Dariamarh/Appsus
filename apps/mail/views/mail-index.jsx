import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/event-bus.service.js"
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailFolders } from "../cmps/mail-folders.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"

export class MailIndex extends React.Component {
    state = {
        emails: [],
        sentMails:[],
        loggedInUser: null,
        filterBy: {
            folder: 'inbox'
        },
        isModalOpened: false,
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
            this.loadUser()
        }
    }
    loadMails = () => {
        this.setState({ emails: mailService.query(this.state.filterBy) })
    }
    loadUser = () => {
        mailService.getLoggedInUser()
            .then(loggedInUser => {
                this.setState({ loggedInUser })
            })
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
    toggleModal = () => {
        const { isModalOpened } = this.state
        this.setState({ isModalOpened: !isModalOpened })
    }
    composeEmail = ({ to, subject, body }) => {
        mailService.add(to, subject, body)
            .then((email) => {
                if (this.state.filterBy.folder === 'sent') {
                    const { emails } = this.state
                    emails.unshift(email)
                    this.setState({ emails })
                }
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
    setStar = (emailId) => {
        mailService.setEmailStatus(emailId, 'starred')
            .then(() => {
                const { emails } = this.state
                const emailIdx = emails.findIndex(email => email.id === emailId)
                emails[emailIdx].status = (emails[emailIdx].status === 'starred') ? null : 'starred'
            })
    }


    render() {
        const { emails, loggedInUser, mailSearch } = this.state
        const { onSetFilter, onToggleIsRead, onRemoveEmail, setStar, toggleModal } = this
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
                        setStar={setStar}
                        loggedInUser={loggedInUser}
                        toggleModal={toggleModal}
                        onToggleIsRead={onToggleIsRead} />

                </div>
            </section>
        )
    }
}
