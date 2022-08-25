// import { noteService } from "../services/note.service.jsx";
import { NoteImg } from "./note-img.jsx";
import { NoteTodos } from "./note-todos.jsx";
import { NoteTxt } from "./note-txt.jsx";
import { NoteVideo } from "./note-video.jsx";

export class NotePreview extends React.Component {

    state = {
        noteType: this.props.note.type
    }

    DynamicCmp = () => {
        const { noteType } = this.state
        const { note, isNoteTxtUpdate, updateNoteTxt, removeNote, handleChange } = this.props
        switch (noteType) {
            case 'note-txt':
                return <NoteTxt
                    handleChange={handleChange}
                    isNoteTxtUpdate={isNoteTxtUpdate}
                    updateNoteTxt={updateNoteTxt}
                    removeNote={removeNote}
                    note={note}
                />
            case 'note-img':
                return <NoteImg
                    removeNote={removeNote}
                    note={note}
                />
            case 'note-todos':
                return <NoteTodos
                    removeNote={removeNote}
                    note={note}
                />
            case 'note-video':
                return <NoteVideo
                    removeNote={removeNote}
                    note={note}
                />
        }
    }

    render() {
        const { note } = this.props
        const { DynamicCmp } = this
        return <section className="note-preview">
            <br />
            <DynamicCmp />
            <hr />
        </section>
    }
}