import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js"

export const noteService = {
    getNotes,
    createNoteTxt,
    createNoteImg,
    createNoteVideo,
    getVideos,
    createNoteTodos
}

const YT_API_Key = 'AIzaSyDY1FSaJrD0PrUG8bPx8Q1lC4g3j9RT9P0'
const KEY = 'videosDB'

function getNotes() {
    return notes
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

function createNoteTodos(title, todos) {
    const currNote = {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            title,
            todos
        }
    }
    return currNote
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
            title: "Sprint🥉 Todos",
            todos: [
                { txt: "Finish Todos list", doneAt: null },
                { txt: "Other required Features", doneAt: 187111111 },
                { txt: "Integration", doneAt: 187111111 },
                { txt: "CSS Design 🧑‍🎨", doneAt: 187111111 },
                { txt: "Canvas Note 🖌️", doneAt: 187111111 },
                { txt: "Drag&Drop 🤚", doneAt: 187111111 },
                { txt: "Add note by blur 👆", doneAt: 187111111 },
                { txt: "Clean Code 🧹", doneAt: 187111111 },
                { txt: "Smoke a little something something 🚬🤠", doneAt: 187111111 },
            ]
        }
    },
    {
        id: "n104",
        type: "note-video",
        info: {
            videoUrl: "https://www.youtube.com/embed/FWy_LbhHtug",
            title: "Video killed the radio"
        },
        style: {
            backgroundColor: "#00d"
        }
    }
];