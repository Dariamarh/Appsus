const { Link } = ReactRouterDOM
import { utilService } from '../../../services/util.service.js'
import { MailDetails } from '../../mail/cmps/mail-details.jsx'

export class MailPreview extends React.Component {

    state = {
        email: this.props.email || {},
        isSelected: false,
    }

    onSelectToggle = (emailId) => {
        this.setState(({ isSelected }) => ({ isSelected: !isSelected }))
        this.props.onToggleIsRead(emailId, true)

    }

   
    render() {
        const { email, onRemoveEmail, starredMail } = this.props
        const { isSelected } = this.state
        const unreadClass = email.isRead ? 'read' : 'unread'

        return <section>
            <Link to={`/mail/${email.id}`}>
                <div onClick={() => {this.onSelectToggle(email.id)}} className={`mail-preview ${unreadClass}`}>
                    <button className='mail-star fa-solid fa-star'></button>
                    <h3 className={unreadClass}>{email.from}</h3>
                    <h3 className={unreadClass}>{email.subject}</h3>
                    <h3 className={unreadClass}>{email.body}</h3>
                    <h3 className="mail-date">{utilService.createdAt(email.sentAt)}</h3>
                    <button className='mail-btn-trash fa-solid fa-trash-can' onClick={() => {onRemoveEmail(email.id)}}></button>
                </div>
            </Link>
            {isSelected && <MailDetails onRemoveEmail={onRemoveEmail} email={email} />}
        </section >
    }
}