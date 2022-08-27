import { NotePreview } from "./note-preview.jsx"

export function NoteList(props) {
    const { notes, removeNote, pinNote, duplicateNote  } = props
    return <section>
        <div className="notes-galley">
            {notes.map(note => <NotePreview
                duplicateNote={duplicateNote}
                pinNote={pinNote}
                notes={notes}
                removeNote={removeNote}
                key={note.id}
                note={note} />
            )}
        </div>
    </section>
}