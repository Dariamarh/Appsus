import { noteService } from "../services/note.service.jsx";
import { NoteImg } from "./note-img.jsx";
import { NoteTodos } from "./note-todos.jsx";
import { NoteTxt } from "./note-txt.jsx";
import { NoteVideo } from "./note-video.jsx";

export class NotePreview extends React.Component {

    state = {
        noteType: this.props.note.type
    }

    DynamicCmp = (props) => {
        switch (this.state.noteType) {
            case 'note-txt':
                return <NoteTxt />
            case 'note-img':
                return <NoteImg />
            case 'note-todos':
                return <NoteTodos />
            case 'note-video':
                return <NoteVideo />
        }
    }

    render() {
        const { note } = this.props
        const { DynamicCmp } = this
        return <section className="note-preview">
            {note.id}
            <br />
            <DynamicCmp />
            <hr />
        </section>
    }
}