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
        switch (this.state.noteType) {
            case 'note-txt':
                return <NoteTxt
                    removeNote={this.props.removeNote}
                    note={this.props.note}
                />
            case 'note-img':
                return <NoteImg
                    removeNote={this.props.removeNote}
                    note={this.props.note}
                />
            case 'note-todos':
                return <NoteTodos
                    removeNote={this.props.removeNote}
                    note={this.props.note}
                />
            case 'note-video':
                return <NoteVideo
                    removeNote={this.props.removeNote}
                    note={this.props.note}
                />
        }
    }

    render() {
        // console.log('this.props PREVIEW', this.props)
        const { note } = this.props
        const { DynamicCmp } = this
        return <section className="note-preview">
            <br />
            <DynamicCmp />
            <hr />
        </section>
    }
}