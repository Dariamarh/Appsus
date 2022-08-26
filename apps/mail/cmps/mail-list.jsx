import { MailPreview } from '../cmps/mail-preview.jsx'


export function MailList({ emails, onRemoveEmail, starredMail, onToggleIsRead}) {
  return <section className="mail-list">
    {emails.map((email) => (
      <MailPreview
        key={email.id}
        email={email}
        onRemoveEmail={onRemoveEmail}
        starredMail={starredMail}
        onToggleIsRead={onToggleIsRead} />
    ))}
  </section>
}