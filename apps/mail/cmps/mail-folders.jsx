import { MailCompose } from "./mail-compose.jsx"
const { NavLink } = ReactRouterDOM

export class MailFolders extends React.Component {

    state = {
        compose: false,
    }

    render() {
        const { compose } = this.state
        const { toggleModal, isModalOpened } = this
        const modalClass = isModalOpened ? 'modal-opened' : ''


        return <section className="mail-menu">
            {console.log(toggleModal)}
            <button className="compose-btn" onClick={toggleModal}>+ Compose</button>
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
            {compose && <MailCompose
                toggleModal={toggleModal}
            />}
        </section>
    }
}