import { NoteList } from "../cmps/note-list.jsx"
import { NoteListPinned } from "../cmps/note-list-pinned.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAdd } from "../cmps/note-add.jsx";
import { utilService } from "../../../services/util.service.js";
import { NoteFilter } from "../cmps/note-filter.jsx";

export class NoteIndex extends React.Component {
    state = {
        notes: [],
        pinnedNotes: [],
        filterBy: null,
        title: 'Click to update title 👋',
        txt: 'Click to update text 👋',
        imgUrl: 'assets/img/white-horse.png',
        videoUrl: 'https://www.youtube.com/embed/FWy_LbhHtug',
        todos: [{ txt: "Dominate REACT 👨‍🔬", doneAt: null, id: utilService.makeId() }],
        userAddTodos: ''
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        let { notes, filterBy } = this.state
        notes = noteService.query(filterBy)
        this.setState({ notes })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadNotes()
        })
    }

    // NOTE ADD FUNCS
    addNoteTodos = (ev) => {
        if (ev) ev.preventDefault()
        let { title, todos, userAddTodos, notes } = this.state
        let todosTxts
        if (userAddTodos) {
            todosTxts = userAddTodos.split('\n')
            todos = todosTxts.map(todoFromInput => {
                return { txt: todoFromInput, doneAt: null, id: utilService.makeId() }
            })
        }
        const { createNoteTodos } = noteService
        this.setState({ notes: [createNoteTodos(title, todos), ...notes] },
            this.setState({
                title: 'Click to update title 👋',
                todos: [{ txt: "Master CSS 🥷", doneAt: null, id: utilService.makeId() }]
            }))
    }

    addNoteVideo = (ev) => {
        ev.preventDefault()
        const { title, videoUrl } = this.state
        const { notes } = this.state
        const { createNoteVideo } = noteService

        this.setState({
            notes: [createNoteVideo(title, videoUrl), ...notes]
        },
            this.setState({
                title: 'Click to update title 👋',
                videoUrl: 'https://www.youtube.com/watch?v=Z3TIhMGQ_8k&'
            }))
    }

    addNoteImg = (ev) => {
        ev.preventDefault()
        const { title, imgUrl } = this.state
        const { notes } = this.state
        const { createNoteImg } = noteService

        this.setState({
            notes: [createNoteImg(title, imgUrl), ...notes]
        },
            this.setState({
                title: 'Click to update title 👋',
                imgUrl: 'assets/img/white-horse.png'
            }))
    }

    addNoteTxt = (ev) => {
        if (ev) ev.preventDefault()
        const { title, txt } = this.state
        const { notes } = this.state
        const { createNoteTxt } = noteService
        this.setState({ notes: [createNoteTxt(title, txt), ...notes] },
            this.setState({
                title: 'Click to update title 👋',
                txt: 'Click to update text 👋'
            }))
    }

    // GENERAL FUNCS
    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({ [name]: value })
    }

    removeNote = (id) => {
        let notes = this.state.notes
        notes = notes.filter(note => note.id !== id)
        this.setState({ notes })
    }

    pinNote = (note) => {
        const { notes, pinnedNotes } = this.state
        const { getIdxById } = noteService
        if (!note.isPinned) {
            notes.splice(getIdxById(notes, note.id), 1)
            pinnedNotes[0] = note
        }
        if (note.isPinned) {
            pinnedNotes.splice(getIdxById(pinnedNotes, note.id), 1)
            notes.unshift(note)
        }
        note.isPinned = !note.isPinned
        this.setState({ notes, pinnedNotes })
    }

    duplicateNote = (note) => {
        const { notes, pinnedNotes } = this.state
        const { getIdxById } = noteService

        const duplicatedNote = { ...note }
        duplicatedNote.id = utilService.makeId()

        if (!note.isPinned) {
            notes.splice(getIdxById(notes, note.id) + 1, 0, duplicatedNote)
        }
        if (note.isPinned) {
            pinnedNotes.splice(getIdxById(pinnedNotes, note.id) + 1, 0, duplicatedNote)
        }
        this.setState({ notes, pinnedNotes })
    }

    setVideoUrl = (id) => {
        this.setState({ videoUrl: "https://www.youtube.com/embed/" + id })
    }

    render() {
        const { notes, pinnedNotes, videoUrl, filterBy } = this.state
        const { addNoteTxt, addNoteImg, addNoteVideo, addNoteTodos,
            removeNote, clearInputs, setVideoUrl, handleChange,
            pinNote, duplicateNote, onSetFilter } = this
        return <section
            className="note-app">
            <NoteAdd
                handleChange={handleChange}
                clearInputs={clearInputs}
                addNoteTxt={addNoteTxt}
                addNoteImg={addNoteImg}
                addNoteTodos={addNoteTodos}
                addNoteVideo={addNoteVideo}
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl}
            />
            <NoteFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
            />
            <NoteListPinned
                duplicateNote={duplicateNote}
                pinNote={pinNote}
                removeNote={removeNote}
                pinnedNotes={pinnedNotes}
            />
            <NoteList
                duplicateNote={duplicateNote}
                pinNote={pinNote}
                removeNote={removeNote}
                notes={notes}
            />
        </section>
    }
}
