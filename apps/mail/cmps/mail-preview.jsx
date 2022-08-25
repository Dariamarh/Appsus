const { Link } = ReactRouterDOM
import { utilService } from '../../../services/util.service.js'
import { MailDetails } from '../../mail/cmps/mail-details.jsx'

export class MailPreview extends React.Component {

    state = {
        email: this.props.email || {},
        isSelected: false,
    }

    onSelectToggle = () => {
        this.setState({ isSelected: !this.state.isSelected })
    }
    render() {
        const { email, isSelected } = this.state
        const { onSelectToggle } = this
        return <section>

            <Link to={`/mail/${email.id}`}>
                <div className="mail-preview" onClick={onSelectToggle}>
                    <button className='mail-star fa-solid fa-star'></button>
                    <h3>{email.from}</h3>
                    <h3>{email.subject}</h3>
                    <h3>{email.body}</h3>
                    <h3 className="mail-date">{utilService.createdAt(email.sentAt)}</h3>
                    <button className='mail-btn-trash fa-solid fa-trash-can' onClick={() => this.props.onRemoveEmail(email.id)}></button>
                </div>
            </Link>
            {isSelected && <MailDetails email={email} onRemoveEmail={this.props.onRemoveEmail} />}
        </section >
    }
}