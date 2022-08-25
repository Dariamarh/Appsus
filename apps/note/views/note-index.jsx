import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAdd } from "../cmps/note-add.jsx";
import { utilService } from "../../../services/util.service.js";

export class NoteIndex extends React.Component {

    state = {
        notes: [],
        title: 'TITLE',
        text: 'TEXT'
    }

    componentDidMount() {
        this.loadNotes()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("UPDATE");
    }


    loadNotes = () => {
        this.setState({ notes: noteService.getNotes() })
    }

    addNoteTxt = (ev) => {
        if (ev) ev.preventDefault()
        const { title, text } = this.state
        console.log('this.state', this.state)


        const { notes } = this.state
        const { createNote } = noteService
        this.setState({ notes: [createNote(title, text), ...notes] },
            () => { console.log('this.state.note[0]', this.state.notes[0]) }
        )

    }

    removeNote = (id) => {
        console.log('REMOVENOTE');
        let notes = this.state.notes
        notes = notes.filter(note => note.id !== id)
        this.setState({ notes })
    }

    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({ [name]: value })
    }

    render() {
        const { notes, title, text } = this.state
        const { addNoteTxt, removeNote ,handleChange} = this
        return <section className="note-app">
            <NoteAdd
                handleChange={handleChange}
                removeNote={removeNote}
                addNoteTxt={addNoteTxt} />
            <hr />
            <NoteList
                removeNote={removeNote}
                notes={notes} />
        </section>
    }
}
