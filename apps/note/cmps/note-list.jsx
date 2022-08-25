import { NotePreview } from "./note-preview.jsx"

export function NoteList(props) {
    const { notes, removeNote } = props
    return <section>
        <div className="notes-galley">
            {notes.map(note => <NotePreview
                removeNote={removeNote}
                key={note.id}
                note={note} />
            )}
        </div>
    </section>
}