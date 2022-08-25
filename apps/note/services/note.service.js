import { utilService } from "../../../services/util.service.js";


export const noteService = {
    getNotes,
    createNoteTxt,
    getById,
    createNoteImg,
    createNoteVideo
}

function getNotes() {
    return notes
}

function createNoteVideo(title, videoUrl) {
    const currNote = {
        id: utilService.makeId(),
        type: "note-video",
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
        info: {
            title,
            txt
        }
    }
    return currNote
}

function getById(array, id) {
    if (!id) return
    // const array = _loadFromStorage()
    const item = array.find(item => id === item.id)
    return item
}

const notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            title: "TITLE",
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
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
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    },
    {
        id: "n104",
        type: "note-video",
        info: {
            videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
            title: "Video killed the radio"
        },
        style: {
            backgroundColor: "#00d"
        }
    }
];