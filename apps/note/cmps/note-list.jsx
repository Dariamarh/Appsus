import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes }) {
    return <section>
        <div className="notes-galley">
            {notes.map(note => <NotePreview
                    key={note.id}
                    note={note} />
            )}
        </div>
    </section>
}