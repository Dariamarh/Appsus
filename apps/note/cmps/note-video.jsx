import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"
import { LabelPicker } from "../../../cmps/label-picker.jsx";

export class NoteVideo extends React.Component {

    state = {
        editState: null,
        youTubeVideos: null,
        labels: [],
        isLabelsList: false
    }

    gLabels = ['ciritcal', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']

    componentDidMount() {
        const { info, backgroundColor } = this.props.note
        const { title, videoUrl } = info
        this.setState({ title, videoUrl, backgroundColor })
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
    }

    isInputEntry = ({ target }) => {
    }

    handleSearchChange = ({ target }) => {
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
    }

    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({ [name]: value })
    }

    setVideoUrl = (id) => {
        this.setState({ videoUrl: "https://www.youtube.com/embed/" + id })
    }

    toggleLabel = () => {
        let { isLabelsList } = this.state
        isLabelsList = !isLabelsList
        this.setState({ isLabelsList })
    }

    setLabel = ({ target }) => {
        let { labels, isLabelsList } = this.state
        if (labels.find(label => label === target.id)) return
        labels.push(target.id)
        isLabelsList = false
        this.setState({ labels, isLabelsList })
    }

    removeLabel = (currLabel) => {
        let { labels } = this.state
        labels = labels.filter(label => label !== currLabel)
        this.setState({ labels })
    }

    render() {
        const { removeNote, note, pinNote, duplicateNote } = this.props
        const { onEditState, offEditState, isInputEntry, isInputExit,
            handleSearchChange, clearSearch, handleChange, setVideoUrl
            , toggleLabel, setLabel, removeLabel, gLabels } = this
        const { editState, youTubeVideos, title, videoUrl, backgroundColor,
            labels, isLabelsList } = this.state
        const { debounce } = utilService

        return <section
            className="note-video-container"
            style={{ backgroundColor: backgroundColor }} >
            {note.isPinned && <div className="pin-div">
                <span
                    className="pin-note-span"
                    onClick={() => { pinNote(note) }}>
                    📌
                </span>
            </div>}
            {!editState && <div
                className="note-video-title"
                onClick={onEditState}>
                {title}
            </div>}
            <div className="video-container">
                <iframe
                    className="youtube-video"
                    src={videoUrl}>
                </iframe>
            </div>
            {editState && <div
                className="edit-container form-note-video flex column">
                <input
                    type="txt"
                    name="title"
                    className="input-note-video-title"
                    defaultValue={title}
                    onChange={handleChange}
                    onClick={isInputEntry}
                    onBlur={isInputExit} />
                <div className="search-user-msg">Search 
                <img
                className="youtube-logo"
                src="assets/img/youtube-logo.png" />
                👇</div>
                <div className="video-search-bar-container">
                    <input
                        type="search"
                        name="videoUrl"
                        className="input-note-video"
                        defaultValue={videoUrl}
                        onBlur={debounce(clearSearch, 500)}
                        onChange={debounce(handleSearchChange, 1000)} />
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
                    className="btn-exit-edit-mode">
                    👍👍
                </button>
            </div>}
            <div
                className="note-btn-container flex">
                <i className="color-picker-icon fa-solid fa-palette"></i>
                <input
                    type="color"
                    name="backgroundColor"
                    className="color-picker"
                    onChange={handleChange} />
                <button
                    className="btn-note"
                    onClick={onEditState}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                    className="btn-note"
                    onClick={() => { pinNote(note) }}>
                    <i class="fa-solid fa-thumbtack"></i>
                </button>
                <button
                    className="btn-note"
                    onClick={() => { duplicateNote(note) }}>
                    <i className="fa-solid fa-clone"></i>
                </button>
                <button
                    className="btn-note"
                    onClick={() => { toggleLabel('work') }} >
                    <i className="fa-solid fa-tag"></i>
                </button>
                {isLabelsList && <ul className="labels-list-container">
                    {gLabels.map(label => {
                        return <li
                            key={label}
                            id={label}
                            className="label-container"
                            onClick={setLabel}>
                            {label}</li>
                    })}
                </ul>}
                <button
                    className="btn-note"
                    onClick={() => removeNote(note.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
            {labels.map(label => <LabelPicker
                key={label}
                labels={labels}
                currLabel={label}
                removeLabel={removeLabel} />)}
        </section>
    }
}


