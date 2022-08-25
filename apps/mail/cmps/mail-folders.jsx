

export class MailFolders extends React.Component{


    render() {
        return <section className="mail-folders">
            <button className="compose-btn">+ Compose</button>
            <ul>
                <li>Inbox</li>
                <li>Starred</li>
                <li>Sent Mail</li>
                <li>Drafts</li>
            </ul>
        </section>
    }
}