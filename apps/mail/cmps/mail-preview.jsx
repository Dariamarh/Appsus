const { Link } = ReactRouterDOM

export function MailPreview({ email }) {

    return <section>
       
        <Link to={`/mail/${email.id}`}>
            <div className="mail-preview">
                <h3>{email.from}</h3>
                <h3>{email.subject}</h3>
                <h3>{email.body}</h3>
                <h3>{email.sentAt}</h3>
            </div>
        </Link>
    </section >
}