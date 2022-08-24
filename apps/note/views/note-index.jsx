import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAdd } from "../cmps/note-add.jsx";

export class NoteIndex extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        this.setState({ notes: noteService.getNotes() })
    }

    render() {
        const { notes } = this.state
        return <section className="note-app">
            <NoteAdd />
            <hr />
            <NoteList notes={notes} />
        </section>
    }
}
