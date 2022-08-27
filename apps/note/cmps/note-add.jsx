import { NoteAddVideo } from "./note-add-video.jsx";
import { NoteAddTxt } from "./note-add-txt.jsx";
import { NoteAddImg } from "./note-add-img.jsx";
import { NoteAddTodos } from "./note-add-todos.jsx";


export class NoteAdd extends React.Component {
    state = {
        noteType: 'note-video',
    }

    clearInputs = () => {
        this.elInputTitle.current.value = ''
        const { noteType } = this.state
        switch (noteType) {
            case 'note-txt':
                this.elInputTxt.current.value = ''
                break;
            case 'note-img':
                this.elInputImgUrl.current.value = ''
                break;
            case 'note-video':
                break;
            case 'note-todos':
                break;
        }
    }

    // INPUTS
    elInputTitle = React.createRef()
    elInputTxt = React.createRef()
    elInputImgUrl = React.createRef()
    elInputVideoUrl = React.createRef()
    elInputTodosList = React.createRef()

    DynamicCmp = () => {
        const { addNoteTxt, addNoteImg, addNoteVideo,
            handleChange, setVideoUrl, addNoteTodos, videoUrl } = this.props
        const { noteType } = this.state
        const { elInputTitle, elInputTxt, elInputImgUrl,
            elInputVideoUrl, elInputTodosList, clearInputs } = this
        switch (noteType) {
            case 'note-txt':
                return <NoteAddTxt
                    elInputTitle={elInputTitle}
                    elInputTxt={elInputTxt}
                    addNoteTxt={addNoteTxt}
                    clearInputs={clearInputs}
                    handleChange={handleChange}
                />
            case 'note-img':
                return <NoteAddImg
                    elInputTitle={elInputTitle}
                    elInputImgUrl={elInputImgUrl}
                    addNoteImg={addNoteImg}
                    clearInputs={clearInputs}
                    handleChange={handleChange}
                />
            case 'note-todos':
                return <NoteAddTodos
                    elInputTitle={elInputTitle}
                    elInputTodosList={elInputTodosList}
                    handleChange={handleChange}
                    addNoteTodos={addNoteTodos}
                />
            case 'note-video':
                return <NoteAddVideo
                    elInputTitle={elInputTitle}
                    elInputVideoUrl={elInputVideoUrl}
                    setVideoUrl={setVideoUrl}
                    videoUrl={videoUrl}
                    addNoteVideo={addNoteVideo}
                    clearInputs={clearInputs}
                    handleChange={handleChange}
                />
        }
    }

    switchNoteType = ({ target }) => {
        this.setState({ noteType: target.id })
    }

    render() {
        const { DynamicCmp, switchNoteType } = this
        return <section
            className="note-add-container">
            <div
                className="note-add flex">
                <DynamicCmp />
                <ul
                    className="btn-note-type-container flex">
                    <li
                        onClick={switchNoteType}
                        id="note-txt"
                        className="btn-note-add txt">✏️</li>
                    <li
                        onClick={switchNoteType}
                        id="note-img"
                        className="btn-note-add img">🖼️</li>
                    <li
                        onClick={switchNoteType}
                        id="note-video"
                        className="btn-note-add video">🎥</li>
                    <li
                        onClick={switchNoteType}
                        id="note-todos"
                        className="btn-note-add todos">📋</li>
                </ul>
            </div>
        </section>
    }
}

