export class NoteTodos extends React.Component {

    state = {
    }

    componentDidMount() {
    }

    loadNotes = () => {
    }

    render() {
        const { removeNote, note } = this.props

        return <section className="note-app">
            im a working TODOS LIST
            {note && <button
                onClick={() => removeNote(note.id)}
                className="btn-remove-note">🗑️</button>}
        </section>
    }
}
