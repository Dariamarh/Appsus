import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../book/services/util.service.js'
const EMAIL_KEY = 'emailDB'


const emailsData = [
    {
        id: 'e101',
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        to: "momo@momo.com",
        state: 'inbox'
    },
    {
        id: 'e102',
        subject: "Hi Darling!",
        body: "Coffee break?",
        isRead: false,
        sentAt: 1551133930594,
        to: "momo@momo.com",
        state: 'sent'
    },
    {
        id: 'e103',
        subject: "Google Cloud",
        body: "Learn the funfamentals with this tutorial - and see what else you can do for free on Google Cloud with our Always Free tier.",
        isRead: false,
        sentAt: 1551133930594,
        to: "momo@momo.com",
        state: 'sent'
    },
    {
        id: 'e104',
        subject: "Confirm your email address",
        body: "Verify your e-mail to finish signing up for Avocode",
        isRead: false,
        sentAt: 1551133930594,
        to: "momo@momo.com",
        state: 'inbox'
    },
    {
        id: 'e105',
        subject: "Google Maps Platform",
        body: "Welcome to Google Maps Platform",
        isRead: false,
        sentAt: 1551133930594,
        to: "momo@momo.com",
        state: 'trash'
    },
    {
        id: 'e106',
        subject: "We noticed a new sign in to your Dropbox",
        body: "A new web browser just signed in to your Dropbox account. To help keep your account secure, let us know if this is you. Is this you?",
        isRead: false,
        sentAt: 1551133930594,
        to: "momo@momo.com",
        state: 'trash'
    },

]

_createEmails()

export const mailService = {
    query,
    remove,
    get,
    save,
}



function query() {
    return storageService.query(EMAIL_KEY)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) return storageService.put(EMAIL_KEY, email)
    else return storageService.post(EMAIL_KEY, email)
}

function _createEmails() {
    const emails = storageService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = emailsData
        storageService.saveToStorage(EMAIL_KEY, emails)
    }
    return emails
}


