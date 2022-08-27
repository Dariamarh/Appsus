import { NotePreview } from "./note-preview.jsx"

export function NoteList(props) {
    const { notes, removeNote, pinNote, duplicateNote } = props
    return <div
        className="notes-gallery">
        {notes.map(note => <NotePreview
            key={note.id}
            notes={notes}
            note={note}
            pinNote={pinNote}
            duplicateNote={duplicateNote}
            removeNote={removeNote} />
        )}
    </div>
}