import { NotePreview } from "./note-preview.jsx"

export function NoteList(props) {
    const { notes, removeNote, updateNoteTxt, isNoteTxtUpdate, handleChange } = props
    return <section>
        <div className="notes-galley">
            {notes.map(note => <NotePreview
                handleChange={handleChange}
                isNoteTxtUpdate={isNoteTxtUpdate}
                updateNoteTxt={updateNoteTxt}
                removeNote={removeNote}
                key={note.id}
                note={note} />
            )}
        </div>
    </section>
}