export class NoteImg extends React.Component {

    state = {
    }

    componentDidMount() {
    }

    loadNotes = () => {
    }

    render() {
        const { removeNote, note } = this.props

        return <section className="note-app">
            <img
                className="img-note"
                src="assets/img/white-horse.png" />
                {note && <button
                    onClick={() => removeNote(note.id)}
                    className="btn-remove-note">🗑️</button>}
        </section>
    }
}
