import { mailService } from "../services/mail.service.js"

export class MailCompose extends React.Component {
    
    state = {
        compose: {
            to: '',
            subject: '',
            body: ''
        }
    }

    onComposeEmail = (ev) => {
        ev.preventDefault()
        console.log(this.state)
        this.props.toggleModal()
        this.props.composeEmail(this.state.compose)
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({
            compose: {
                ...prevState.compose,
                [field]: value
            }
        }))
    }
    
    render() {
        const { onComposeEmail } = this
        const { to, subject, body } = this.state.compose
        const { toggleModal, isModalOpened } = this.props
        const modalClass = isModalOpened ? 'modal-opened' : 'mail-letter'

        return <section className={`mail-compose ${modalClass}`}>
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

                <button onClick={onComposeEmail} className="email-send">Send</button>

            </div>
        </section>
    }
}


