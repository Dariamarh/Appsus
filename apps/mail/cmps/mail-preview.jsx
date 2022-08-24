const { Link } = ReactRouterDOM

export function MailPreview({ email }) {

    return <section>
        <Link to={`/mail/${email.id}`}>
            <div className="mail-preview">
                <p>fdf</p>
            </div>
        </Link>
    </section>
}