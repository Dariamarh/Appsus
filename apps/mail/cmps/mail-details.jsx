

export function MailDetails({ email }) {

    return <section className="mail-details">
        <div>From: {email.from}</div>
        <div>To: {email.to}</div>
        <div className="mail-content">
            <div>
                {email.body}
            </div>
        </div>
    </section>
}