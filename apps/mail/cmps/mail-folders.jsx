import { MailCompose } from "./mail-compose.jsx"
const { Link } = ReactRouterDOM

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
                <Link to={`/mail/`}>
                    <button className="mail-inbox">Inbox</button>
                </Link>
                <button className="mail-starred">Starred</button>
                <button className="mail-sent">Sent Mail</button>
                <button className="mail-drafts">Drafts</button>
            </div>
            {compose && <MailCompose />}
        </section>
    }
}