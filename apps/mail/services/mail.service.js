import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const EMAIL_KEY = 'emailDB'


const emailsData = [
    {
        id: 'e101',
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        from: "user@appsus.com",
        sentAt: 1661372169155,
        to: "momo@momo.com",
        state: 'inbox'
    },
    {
        id: 'e102',
        subject: "Hi Darling!",
        body: "Coffee break?",
        isRead: false,
        from: "momo11@momo.com",
        sentAt: 1641372169155,
        to: "momo@momo.com",
        state: 'sent'
    },
    {
        id: 'e103',
        subject: "Google Cloud",
        body: "Learn the funfamentals with this tutorial - and see what else you can do",
        isRead: false,
        from: "koko@gmail.com",
        sentAt: 1551133930594,
        to: "momo@momo.com",
        state: 'sent'
    },
    {
        id: 'e104',
        subject: "Confirm your email",
        body: "Verify your e-mail to finish signing up for Avocode",
        isRead: false,
        from: "avocado@appsus.com",
        sentAt: 1551133930594,
        to: "momo@momo.com",
        state: 'inbox'
    },
    {
        id: 'e105',
        subject: "Google Maps Platform",
        body: "Welcome to Google Maps Platform",
        isRead: false,
        from: "google@gmail.com",
        sentAt: 1551133930594,
        to: "momo@momo.com",
        state: 'trash'
    },
    {
        id: 'e106',
        subject: "Dropbox",
        body: "A new web browser just signed in to your Dropbox account.",
        isRead: false,
        from: "dropbox@appsus.com",
        sentAt: 1457293308000,
        to: "momo@momo.com",
        state: 'trash'
    },

]
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    remove,
    save,
    getMailById,
    loadMails,
    sendNewMail,
    toggleIsRead,
}

function query(filterBy) {
    let emails = _loadMailsFromStorage()
    if (!emails) {
        emails = emailsData
        _saveMailsToStorage(emails)
    }
    if (filterBy) {
        let { folder, search } = filterBy

        if (search) {
            emails = emails.filter(email => (
                email.body.includes(search) ||
                email.to.includes(search) ||
                email.subject.includes(search)
            ))
        } else {
            switch (folder) {
                case 'inbox':
                    emails = emails.filter(email => email.to === 'user@appsus.com')
                    break;

                case 'starred':
                    emails = emails.filter(email => email.status === 'starred')
                    break;

                case 'sent':
                    emails = emails.filter(email => email.to !== 'user@appsus.com')
                    break;
                case 'drafts':
                    emails = emails.filter(email => email.status === 'drafts')
                    break;

                case 'trash':
                    emails = emails.filter(email => email.status === 'trash')
                    break;
                case 'unread':
                    emails = emails.filter(email => email.isRead === false)
                    break;

                case 'read':
                    emails = emails.filter(email => email.isRead === true)
                    break;
            }
        }
    }
    return emails
}

function remove(emailId) {
    let emails = _loadMailsFromStorage()
    const emailIdx = emails.findIndex(email => email.id === emailId)
    emails[emailIdx].status = (emails[emailIdx].status !== 'trash') ? 'trash' : 'remove'

    if (emails[emailIdx].status === 'remove') {
        emails = emails.filter(email => email.id !== emailId)
    }
    _saveMailsToStorage(emails)
    return Promise.resolve()
}

function save(emails) {
    _saveMailsToStorage(emails)
}

function loadMails() {
    return _loadMailsFromStorage()
}

function getMailById(emailId) {
    const emails = _loadMailsFromStorage()
    let email = emails.find((email) => emailId === email.id)
    return Promise.resolve(email)
}

function toggleIsRead(emailId, isRead) {
    let emails = _loadMailsFromStorage()
    const emailIdx = emails.findIndex(email => emailId === email.id)
    emails[emailIdx].isRead = true
    _saveMailsToStorage(emails)
    return Promise.resolve()
}
function sendNewMail(to, subject, body) {
    return {
        id: utilService.makeId(),
        subject: subject,
        body: body,
        isRead: utilService.getRandomIntInclusive(0, 2),
        sentAt: Date.now(),
        star: false,
        fromEmail: loggedinUser.email,
        to: to,
        from: loggedinUser.fullname,
    }
}

function _saveMailsToStorage(emails) {
    storageService.saveToStorage(EMAIL_KEY, emails)
}

function _loadMailsFromStorage() {
    return storageService.loadFromStorage(EMAIL_KEY)
}
