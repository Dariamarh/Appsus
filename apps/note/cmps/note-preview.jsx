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
        const { note, removeNote, handleChange,
            isNoteUpdate, updateNoteTxt, updateNoteImg,
            updateNoteVideo, setVideoUrl } = this.props

        switch (noteType) {
            case 'note-txt':
                return <NoteTxt
                    handleChange={handleChange}
                    isNoteUpdate={isNoteUpdate}
                    updateNoteTxt={updateNoteTxt}
                    removeNote={removeNote}
                    note={note}
                />
            case 'note-img':
                return <NoteImg
                    isNoteUpdate={isNoteUpdate}
                    handleChange={handleChange}
                    updateNoteImg={updateNoteImg}
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
                    setVideoUrl={setVideoUrl}
                    isNoteUpdate={isNoteUpdate}
                    handleChange={handleChange}
                    updateNoteVideo={updateNoteVideo}
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