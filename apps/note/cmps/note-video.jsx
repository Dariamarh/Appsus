export class NoteVideo extends React.Component {

    state = {
    }

    componentDidMount() {
    }

    loadNotes = () => {
    }

    render() {
        const { removeNote, note } = this.props

        return <section className="note-app">
            im a working VIDEO
            {note && <button
                onClick={() => removeNote(note.id)}
                className="btn-remove-note">🗑️</button>}
        </section>
    }
}
