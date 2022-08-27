import { NoteList } from "../cmps/note-list.jsx"
import { NoteListPinned } from "../cmps/note-list-pinned.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAdd } from "../cmps/note-add.jsx";
import { utilService } from "../../../services/util.service.js";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { LabelPicker } from "../../../cmps/label-picker.jsx";

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
        console.log('COMPONENT DID MOUNT');
        this.loadNotes()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('COMPONENT DID UPDATE');

    }

    loadNotes = () => {
        // console.log('LOAD NOTES');
        let { notes, filterBy } = this.state
        notes = noteService.query(filterBy)
        this.setState({ notes })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadNotes()
        })
    }

    // NOTE TODOS FUNCS
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


    // NOTE VIDEO FUNCS
    addNoteVideo = (ev) => {
        // console.log('ADD NOTE IMG');
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

    // NOTE IMAGE FUNCS
    addNoteImg = (ev) => {
        // console.log('ADD NOTE IMG');
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

    // NOTE TEXT FUNCS
    addNoteTxt = (ev) => {
        // console.log('ADD NOTE TEXT');
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

    removeNote = (id) => {
        let notes = this.state.notes
        notes = notes.filter(note => note.id !== id)
        this.setState({ notes })
    }

    setLabel = (labelType) => {
        console.log('labelType', labelType)
    }

    handleChange = ({ target }) => {
        // console.log('HANDLE CHANGE');
        const { value, name } = target
        this.setState({ [name]: value })

    }

    setVideoUrl = (id) => {
        this.setState({ videoUrl: "https://www.youtube.com/embed/" + id })
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
            console.log('2nd IF');
        }
        this.setState({ notes, pinnedNotes })
    }

    render() {
        const { notes, pinnedNotes, videoUrl, filterBy } = this.state
        const { addNoteTxt, addNoteImg, addNoteVideo, addNoteTodos,
            removeNote, clearInputs, setVideoUrl, handleChange, pinNote, duplicateNote, onSetFilter, setLabel } = this
        return <section className="note-app">
            <NoteAdd
                addNoteTodos={addNoteTodos}
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl}
                clearInputs={clearInputs}
                handleChange={handleChange}
                addNoteVideo={addNoteVideo}
                addNoteImg={addNoteImg}
                addNoteTxt={addNoteTxt} />
            <hr />
            <NoteFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
            />
            <hr />
            <NoteListPinned
                duplicateNote={duplicateNote}
                pinNote={pinNote}
                removeNote={removeNote}
                pinnedNotes={pinnedNotes} />
            <hr />
            <NoteList
                setLabel={setLabel}
                duplicateNote={duplicateNote}
                pinNote={pinNote}
                removeNote={removeNote}
                notes={notes} />
        </section>
    }
}
