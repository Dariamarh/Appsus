import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAdd } from "../cmps/note-add.jsx";
import { utilService } from "../../../services/util.service.js";

export class NoteIndex extends React.Component {

    state = {
        notes: [],
        title: 'TITLE',
        text: 'TEXT',
        isNoteTxtUpdate: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isNoteTxtUpdate) {
            this.loadNotes()
            this.setState({ isNoteTxtUpdate: null })
        }
    }


    loadNotes = () => {
        let currNotes = this.state.notes
        if (!this.state.notes.length) currNotes = noteService.getNotes()
        this.setState({ notes: currNotes })
    }

    addNoteTxt = (ev) => {
        if (ev) ev.preventDefault()
        const { title, text } = this.state
        const { notes } = this.state
        const { createNote } = noteService
        this.setState({ notes: [createNote(title, text), ...notes] })
    }

    updateNoteTxt = (id) => {
        const { notes } = this.state
        const currIdx = notes.findIndex(note => note.id === id)
        const currNote = noteService.getById(notes, id)

        currNote.info.title = 'check'

        notes[currIdx] = currNote


        this.setState(notes[currIdx],
            () => { this.setState({ isNoteTxtUpdate: true }) })
    }

    removeNote = (id) => {
        let notes = this.state.notes
        notes = notes.filter(note => note.id !== id)
        this.setState({ notes })
    }

    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({ [name]: value })
        console.log('HANDLE CHANGE');
        // console.log('this.state.notes', this.state.notes)
    }

    render() {
        const { notes, title, text, isNoteTxtUpdate } = this.state
        const { addNoteTxt, removeNote, handleChange, updateNoteTxt } = this
        return <section className="note-app">
            <NoteAdd
                removeNote={removeNote}
                addNoteTxt={addNoteTxt} />
            <hr />
            <NoteList
                handleChange={handleChange}
                isNoteTxtUpdate={isNoteTxtUpdate}
                updateNoteTxt={updateNoteTxt}
                removeNote={removeNote}
                notes={notes} />
        </section>
    }
}
