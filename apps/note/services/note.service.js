import { utilService } from "../../../services/util.service.js";


export const noteService = {
    getNotes,
    createNote,
    getById
}

function getNotes() {
    return notes
}


function createNote(title, txt) {
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
            title:"TITLE",
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "assets/img/click-here.png",
            title: "Bobi and Me"
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
            label: "Video killed the radio",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }
];