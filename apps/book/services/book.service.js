import { booksDB } from './data.service.js'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const STORAGE_KEY = 'booksDB'

export const bookService = {
    query,
    getById,
    addReview,
    getFormattedPrice,
    getCurrDate,
    findGoogleBooks,
    addGoogleBook,
    getNextbookId,
    getPrevbookId,
    STORAGE_KEY
}


function query(filterBy) {
    let books = _loadFromStorage()
    if (!books) {
        books = booksDB
        _saveToStorage(booksDB)
    }

    if (filterBy) {
        let { name, maxPrice, minPrice } = filterBy
        if (!minPrice) minPrice = 0
        if (!maxPrice) maxPrice = Infinity

        books = books.filter(book => (
            book.title.includes(name) &&
            book.listPrice.amount >= minPrice &&
            book.listPrice.amount <= maxPrice)
        )
    }

    return Promise.resolve(books)
}

function getById(bookId) {
    if (!bookId) return Promise.resolve(null)
    const books = _loadFromStorage()
    const book = books.find(book => bookId === book.id)
    return Promise.resolve(book)
}

//Switch page func
function getNextbookId(id) {
    let books = _loadFromStorage()
    const bookIdx = books.findIndex(book => book.id === id)
    const nextBookIdx = bookIdx + 1 === books.length ? 0 : bookIdx + 1
    return books[nextBookIdx].id
}

function getPrevbookId(id) {
    let books = _loadFromStorage()
    const bookIdx = books.findIndex(book => book.id === id)
    const prevBookIdx = bookIdx - 1 === -1 ? books.length - 1 : bookIdx - 1
    return books[prevBookIdx].id
}

//Add Func
function addReview(name, rate, date, text, bookId, reviews) {
    const newReview = { name, rate, date, text, id: utilService.makeId() }
    reviews.unshift(newReview)
    storageService.saveToStorage('review-' + bookId, reviews)
}

//Google Books
function findGoogleBooks(searchTerm) {
    const { saveToStorage, loadFromStorage } = storageService
    let currBooks
    let prm = axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`)
        .then((res) => {
            currBooks = loadFromStorage(searchTerm) || res.data
            saveToStorage(searchTerm, currBooks)
            return Promise.resolve(currBooks)
        })
    return prm
}

function addGoogleBook(book, id) {
 
    book.listPrice = { amount: 150, currencyCode: 'USD', isOnSale: false }
    const altImg = 'assets/img/no-image-icon.png'
    book.thumbnail = altImg
    if (book.imageLinks) book.thumbnail = book.imageLinks.thumbnail
    if (!book.description) book.description = 'No description availabe'
    book.id = id
    return Promise.resolve(book)
}

//Format Func
function getFormattedPrice({ amount, currencyCode }) {
    switch (currencyCode) {
        case "EUR":
            return amount + '€'
        case "USD":
            return '$' + amount
        case "ILS":
            return '₪' + amount
    }
}

function getCurrDate() {
    let currDate = new Date();
    let day = currDate.getDate();
    if (day < 10) day = '0' + day
    else day = '' + day

    let month = currDate.getMonth() + 1;
    if (month < 10) month = '0' + month
    else month = '' + month

    let year = currDate.getFullYear();

    currDate = year + '-' + month + '-' + day
    return currDate
}

function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveToStorage(data) {
    storageService.saveToStorage(STORAGE_KEY, data)
}