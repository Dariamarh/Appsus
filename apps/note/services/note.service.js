import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js"

export const noteService = {
    getNotes,
    query,
    createNoteTxt,
    createNoteImg,
    createNoteVideo,
    getVideos,
    createNoteTodos,
    getIdxById,
}

const YT_API_Key = 'AIzaSyDY1FSaJrD0PrUG8bPx8Q1lC4g3j9RT9P0'
const KEY = 'videosDB'
const STORAGE_KEY = 'notesDB'

function query(filterBy) {
    let notes = storageService.loadFromStorage(STORAGE_KEY)
    if (!notes) {
        notes = getNotes()
        storageService.saveToStorage(STORAGE_KEY, notes)
    }

    if (filterBy) {
        let { title, noteType, } = filterBy

        notes = notes.filter(note => {
            return (
                note.info.title.toUpperCase().includes(title.toUpperCase()) &&
                note.type.includes(noteType)
            )
        })
    }

    return notes
}

function getNotes() {
    return notes
}

function getIdxById(notes, id) {
    return notes.findIndex(note => note.id === id)
}

function getVideos(term) {
    const termVideosMap = storageService.loadFromStorage(KEY) || {}
    if (termVideosMap[term]) return Promise.resolve(termVideosMap[term])
    console.log('Getting from Network')

    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_API_Key}&q=${term}`)
        .then(res => res.data.items)
        .then(ytVideos => ytVideos.map(ytVideo => ({
            id: ytVideo.id.videoId,
            title: ytVideo.snippet.title,
            img: {
                url: ytVideo.snippet.thumbnails.default.url,
                width: ytVideo.snippet.thumbnails.default.width,
                height: ytVideo.snippet.thumbnails.default.height,
            }
        })))
        .then(videos => {
            termVideosMap[term] = videos
            storageService.saveToStorage(KEY, termVideosMap)
            return videos
        })

}


function createNoteTodos(title, todos) {
    const currNote = {
        id: utilService.makeId(),
        backgroundColor: utilService.getRandomColor(),
        type: "note-todos",
        isPinned: false,
        labels: [],
        info: {
            title,
            todos
        }
    }
    return currNote
}

function createNoteVideo(title, videoUrl) {
    const currNote = {
        id: utilService.makeId(),
        type: "note-video",
        isPinned: false,
        labels: [],
        backgroundColor: utilService.getRandomColor(),
        info: {
            title,
            videoUrl,
        },
        style: {
            backgroundColor: "#00d"
        }
    }
    return currNote
}


function createNoteImg(title, imgUrl) {
    const currNote = {
        id: utilService.makeId(),
        type: "note-img",
        isPinned: false,
        labels: [],
        backgroundColor: utilService.getRandomColor(),
        info: {
            title,
            imgUrl,
        },
        style: {
            backgroundColor: "#00d"
        }
    }
    return currNote
}

function createNoteTxt(title, txt) {
    const currNote = {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        labels: [],
        backgroundColor: utilService.getRandomColor(),
        info: {
            title,
            txt
        }
    }
    return currNote
}




const notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: false,
        labels: [],
        backgroundColor: utilService.getRandomColor(),
        info: {
            title: "TITLE",
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        backgroundColor: utilService.getRandomColor(),
        type: "note-img",
        isPinned: false,
        labels: [],
        info: {
            imgUrl: "assets/img/white-horse.png",
            title: "APPSUS🦾"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        labels: [],
        backgroundColor: utilService.getRandomColor(),
        info: {
            title: "Sprint🥉 Todos",
            todos: [
                { txt: "Finish Todos list", doneAt: '08/26/2022 19:08', id: utilService.makeId() },
                { txt: "Finish Filter && Labels", doneAt: '08/27/2022 15:11', id: utilService.makeId() },
                { txt: "Make it Asynchronized", doneAt: null, id: utilService.makeId() },
                { txt: "Debugging 🐛🐛🐛", doneAt: '08/27/2022 16:45', id: utilService.makeId() },
                { txt: "CSS Design 🧑‍🎨 && Responsivity 📱", doneAt: null, id: utilService.makeId() },
                { txt: "Integration", doneAt: null, id: utilService.makeId() },
                { txt: "Drag&Drop 🤚", doneAt: null, id: utilService.makeId() },
                { txt: "Add note by blur 👆", doneAt: null, id: utilService.makeId() },
                { txt: "Clean Code 🧹", doneAt: null, id: utilService.makeId() },
            ]
        }
    },
    {
        id: "n104",
        type: "note-video",
        backgroundColor: utilService.getRandomColor(),
        isPinned: false,
        labels: [],
        info: {
            videoUrl: "https://www.youtube.com/embed/FWy_LbhHtug",
            title: "Video killed the radio"
        },
        style: {
            backgroundColor: "#00d"
        }
    }
];