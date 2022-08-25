import { NotePreview } from "./note-preview.jsx"

export function NoteList(props) {
    const { notes, removeNote,
        updateNoteTxt, updateNoteImg, updateNoteVideo,
        isNoteUpdate, handleChange } = props
    return <section>
        <div className="notes-galley">
            {notes.map(note => <NotePreview
                handleChange={handleChange}
                isNoteUpdate={isNoteUpdate}
                updateNoteTxt={updateNoteTxt}
                updateNoteImg={updateNoteImg}
                updateNoteVideo={updateNoteVideo}
                removeNote={removeNote}
                key={note.id}
                note={note} />
            )}
        </div>
    </section>
}