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
}

function query(filterBy) {
    let emails = _loadMailsFromStorage()
    if (!emails) {
        emails = emailsData
        _saveMailsToStorage(emails)
    }
    return emails
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
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

function sendNewMail(newMail) {
    let email = {
        id: utilService.makeId(),
        subject: newMail.subject,
        body: newMail.text,
        isRead: false,
        sentAt: Date.now(),
        star: false,
        labels: newMail.labels,
        fromEmail: loggedinUser.email,
        to: newMail.to,
        from: loggedinUser.fullname,
        isOpen: false,
        isTrash: false,
    }
    
}

function _saveMailsToStorage(emails) {
    storageService.saveToStorage(EMAIL_KEY, emails)
}

function _loadMailsFromStorage() {
    return storageService.loadFromStorage(EMAIL_KEY)
}
