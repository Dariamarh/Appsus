import { NotePreview } from "./note-preview.jsx"

export function NoteListPinned(props) {
    const { pinnedNotes, pinNote, removeNote } = props
    return <section
        className="note-list-pinned-container">
        {pinnedNotes.map(note => <NotePreview
            key={note.id}
            notes={pinnedNotes}
            pinNote={pinNote}
            note={note}
            removeNote={removeNote} />)}
    </section>
}