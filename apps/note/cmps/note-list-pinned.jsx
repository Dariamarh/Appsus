import { NotePreview } from "./note-preview.jsx"

export function NoteListPinned(props) {
    // console.log('props', props)
    const { pinnedNotes, pinNote, removeNote } = props
    return <section
        className="note-list-pinned-container">
        note list pinned
        {pinnedNotes.map(note => <NotePreview
            pinNote={pinNote}
            notes={pinnedNotes}
            removeNote={removeNote}
            key={note.id}
            note={note} />)}
    </section>
}