import { NoteImg } from "./note-img.jsx";
import { NoteTodos } from "./note-todos.jsx";
import { NoteTxt } from "./note-txt.jsx";
import { NoteVideo } from "./note-video.jsx";

export class NotePreview extends React.Component {

    state = {
        noteType: this.props.note.type,
    }

    DynamicCmp = () => {
        const { noteType } = this.state
        const { notes, note, removeNote, pinNote, duplicateNote } = this.props

        switch (noteType) {
            case 'note-txt':
                return <NoteTxt
                    notes={notes}
                    note={note}
                    duplicateNote={duplicateNote}
                    pinNote={pinNote}
                    removeNote={removeNote}
                />
            case 'note-img':
                return <NoteImg
                    notes={notes}
                    note={note}
                    duplicateNote={duplicateNote}
                    pinNote={pinNote}
                    removeNote={removeNote}
                />
            case 'note-todos':
                return <NoteTodos
                    notes={notes}
                    note={note}
                    duplicateNote={duplicateNote}
                    pinNote={pinNote}
                    removeNote={removeNote}
                />
            case 'note-video':
                return <NoteVideo
                    notes={notes}
                    note={note}
                    duplicateNote={duplicateNote}
                    pinNote={pinNote}
                    removeNote={removeNote}
                />
        }
    }

    render() {
        const { note } = this.props
        const { DynamicCmp } = this
        return <section
            className="note-preview">
            <DynamicCmp />
        </section>
    }
}