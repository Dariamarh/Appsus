import { mailService } from "../services/mail.service.js"

export class MailCompose extends React.Component {

    state = {
        to: '',
        subject: '',
        body: '',
    }
    componentDidMount() {
        this.loadMails()
    }

    onSelectToggle = () => {
        this.setState({ isSelected: !this.state.isSelected })
    }

    loadMails = () => {
    }

    onSendMail = (ev) => {
        ev.preventDefault()
        console.log(this.state)
        mailService.sendNewMail(this.state)
        // this.setState({ to: '', subject: '', text: '' })
        this.setState({sentMails:[currMail,...sentMails]})
        this.onSelectToggle()

    }


    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({ ...prevState, [field]: value }))
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
    render() {
        const { to, subject, body } = this.state
        const { onSendMail } = this
        const {sentMails} = this.props

        return <section className="mail-compose">
            <div className="mail-letter">
                <form className="mail-new-msg">
                    <h3 className="msg-title">New Message</h3>
                    <div className="mail-to">
                        <label htmlFor="subject">Recipients</label>
                        <input type="text" name="to"
                            defaultValue={to}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="mail-subj">
                        <label htmlFor="to">Subject</label>
                        <input type="text" name="subject"
                            defaultValue={subject}
                            onChange={this.handleChange}
                        />
                    </div>
                    <label htmlFor="body"></label>
                    <textarea
                        type='text'
                        name="body"
                        defaultValue={body}
                        onChange={this.handleChange}
                    ></textarea>
                </form>

                <button className="email-send" onClick={onSendMail}>Send</button>
            </div>
        </section>
    }
}


