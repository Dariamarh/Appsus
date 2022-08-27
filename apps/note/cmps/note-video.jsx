import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"


export class NoteVideo extends React.Component {

    state = {
        editState: null,
        youTubeVideos: null
    }

    componentDidMount() {
        const { info, backgroundColor } = this.props.note
        const { title, videoUrl } = info
        this.setState({ title, videoUrl, backgroundColor })


    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('COMPNENT DID UPDATE -- NOTE TEXT');
        // const { isNoteUpdate } = this.props
        // if (isNoteUpdate) {
        //     if (this.props.note) {
        //         const { info } = this.props.note
        //         const { title, videoUrl } = info
        //         this.setState({ title, videoUrl },
        //             () => { console.log('this.state', this.state) })
        //     }
        // }
    }

    onEditState = () => {
        this.setState({ editState: true })
    }

    offEditState = (id) => {
        this.setState({ editState: null })
        this.updateNoteVideo()
    }

    //Blur detectors
    isInputExit = () => {
        // console.log('EXIT');
        // this.setState({ inputExit: true }, () => {
        //     this.addNoteTxt()
        // })
        // this.state.inputExit = true
        // this.state.inputEntry = null
        // this.addNoteTxt()
    }

    isInputEntry = ({ target }) => {
        // console.log('ENTRY');
        // this.setState({ inputEntry: true })
        // this.state.inputEntry = true
        // this.state.inputExit = null
    }

    handleSearchChange = ({ target }) => {
        // console.log('HANDLE SEARCH CHANGE');
        // console.log('target.value', target.value)
        noteService.getVideos(target.value)
            .then((res) => {
                this.setState({ youTubeVideos: res })
            })
    }

    clearSearch = ({ target }) => {
        target.value = this.state.videoUrl
        this.setState({ youTubeVideos: null })
    }


    updateNoteVideo = (id) => {
        const { title, videoUrl } = this.state
        this.setState({ title, videoUrl })
        // const currIdx = notes.findIndex(note => note.id === id)
        // const currNote = utilService.getById(notes, id)
        // currNote.info.title = title
        // currNote.info.videoUrl = videoUrl
        // notes[currIdx] = currNote
        // this.setState(notes[currIdx],
        //     () => {
        //         this.setState({
        //             isNoteUpdate: true,
        //             title: 'Click to update title 👋',
        //             txt: 'Click to update text 👋'
        //         })
        //     })
    }

    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({ [name]: value })
        // console.log('HANDLE CHANGE');
    }

    setVideoUrl = (id) => {
        this.setState({ videoUrl: "https://www.youtube.com/embed/" + id })
    }

    render() {
        const { removeNote, note, pinNote,duplicateNote } = this.props
        const { onEditState, offEditState, isInputEntry, isInputExit,
            handleSearchChange, clearSearch, handleChange, setVideoUrl } = this
        const { editState, youTubeVideos, title, videoUrl, backgroundColor } = this.state
        const { debounce } = utilService

        return <section

            className="note-video-container">
            {!editState && <div
                style={{ backgroundColor: backgroundColor }}
                onClick={onEditState}
                className="note-video-title">{title}</div>}


            <iframe
                className="video-container"
                width="420"
                height="315"
                src={videoUrl}>
            </iframe>

            {editState && <div className="edit-container form-note-video flex column">
                <input
                    type="txt"
                    className="input-note-title"
                    name="title"
                    defaultValue={title}
                    onChange={handleChange}
                    onClick={isInputEntry}
                    onBlur={isInputExit} />

                <div className="search-user-msg">Search for youTube videos here👇</div>
                <div className="video-search-bar-container">
                    <input
                        type="search"
                        className="input-note-video"
                        name="videoUrl"
                        defaultValue={videoUrl}
                        onBlur={debounce(clearSearch, 500)}
                        onChange={debounce(handleSearchChange, 1000)}
                    />
                    {youTubeVideos && <ul className="youtube-video-container">
                        {youTubeVideos.map(video => {
                            const { title, id } = video
                            return <li key={id}
                                className="youtube-video">
                                {title}
                                <i className="fa-solid fa-circle-plus btn-add-book"
                                    onClick={() => setVideoUrl(id)}></i>
                            </li>
                        })}
                    </ul>}
                </div>


                <button
                    onClick={() => offEditState(note.id)}
                    className="btn-exit-edit-mode"
                >Update</button>
            </div>}
            <input
                // className="color-picker"
                onChange={handleChange}
                type="color"
                name="backgroundColor"
                id="" />


            <button
                className="btn-edit-video"
                onClick={onEditState}
            >✏️</button>
            <button
                    onClick={() => { pinNote(note) }}
                    className="btn-pin-note">📌</button>
                     <button
                    onClick={() => {duplicateNote(note) }}
                    className="btn-duplicate-note"><i className="fa-solid fa-clone"></i></button>
            <button
                onClick={() => removeNote(note.id)}
                className="btn-remove-note">🗑️</button>
        </section>
    }
}


