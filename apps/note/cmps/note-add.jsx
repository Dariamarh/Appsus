import { NoteAddVideo } from "./note-add-video.jsx";
import { NoteAddTxt } from "./note-add-txt.jsx";
import { NoteAddImg } from "./note-add-img.jsx";
import { NoteAddTodos } from "./note-add-todos.jsx";


export class NoteAdd extends React.Component {
    state = {
        noteType: 'note-todos',
    }


    DynamicCmp = (props) => {
        const { addNoteTxt, addNoteImg, addNoteVideo,
            handleChange, clearInputs, setVideoUrl } = this.props
        const { noteType } = this.state
        switch (noteType) {
            case 'note-txt':
                return <NoteAddTxt
                    clearInputs={clearInputs}
                    handleChange={handleChange}
                    addNoteTxt={addNoteTxt} />
            case 'note-img':
                return <NoteAddImg
                    clearInputs={clearInputs}
                    addNoteImg={addNoteImg}
                    handleChange={handleChange}
                />
            case 'note-todos':
                return <NoteAddTodos />
            case 'note-video':
                return <NoteAddVideo
                    setVideoUrl={setVideoUrl}
                    clearInputs={clearInputs}
                    addNoteVideo={addNoteVideo}
                    handleChange={handleChange}
                />
        }
    }

    switchNoteType = ({ target }) => {
        // console.log('target.id', target.id)
        this.setState({ noteType: target.id })
    }



    render() {
        const { DynamicCmp, switchNoteType } = this
        const { notes, addNoteTxt } = this.props
        return <section className="note-add-container">
            <div className="note-add flex">
                <DynamicCmp />
                <ul className="btn-note-type-container flex">
                    <li
                        onClick={switchNoteType}
                        id="note-txt"
                        className="btn-note-txt">✏️</li>
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
