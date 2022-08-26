import { MailCompose } from "./mail-compose.jsx"
import { MailSent } from "../views/mail-sent.jsx"
const { NavLink } = ReactRouterDOM

export class MailFolders extends React.Component {

    state = {
        compose: false,
    }
    onComposeToggle = () => {
        this.setState({ compose: !this.state.compose })
    }

    render() {
        const { compose } = this.state
        const { onComposeToggle } = this

        return <section className="mail-menu">
            <button className="compose-btn" onClick={onComposeToggle}>+ Compose</button>
            <div className="mail-folders">
                <NavLink to={`/mail/`}>
                    <button className="mail-inbox"> <i className="fa-solid fa-inbox"></i>Inbox</button>
                </NavLink>
                <NavLink to="/mail/starred">
                    <button className="mail-starred"><i className="fa-solid fa-star"></i>Starred</button>
                </NavLink>
                <NavLink to="/mail/sent">
                    <button className="mail-sent"><i className="fa-solid fa-paper-plane"></i>Sent Mail</button>
                </NavLink>
                <NavLink to="/mail/drafts">
                    <button className="mail-drafts"><i className="fa-brands fa-firstdraft"></i>Drafts</button>
                </NavLink>
                <NavLink to="/mail/trash">
                    <button className="mail-drafts"> <i className="fa-solid fa-trash-can"></i>Trash</button>
                </NavLink>
            </div>
            {compose && <MailCompose />}
        </section>
    }
}