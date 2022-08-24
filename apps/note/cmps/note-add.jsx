import { NoteImg } from "./note-img.jsx";
import { NoteTodos } from "./note-todos.jsx";
import { NoteTxt } from "./note-txt.jsx";
import { NoteVideo } from "./note-video.jsx";

export class NoteAdd extends React.Component {
    state = {
        noteType: 'note-txt'
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

    switchNoteType = ({ target }) => {
        console.log('target.id', target.id)
        this.setState({ noteType: target.id })
    }

    render() {
        const { DynamicCmp, switchNoteType } = this

        return <section className="note-add-container">
            <div className="note-add flex">
                <DynamicCmp />
                <ul className="btn-note-type-container flex">
                    <li
                        onClick={switchNoteType}
                        id="note-txt"
                        className="btn-note-text">✏️</li>
                    <li
                        onClick={switchNoteType}
                        id="note-img"
                        className="btn-note-img">🖼️</li>
                    <li
                        onClick={switchNoteType}
                        id="note-video"
                        className="btn-note-video">🎥</li>
                    <li
                        onClick={switchNoteType}
                        id="note-todos"
                        className="btn-note-todos">📋</li>
                </ul>
            </div>
        </section>
    }
}
