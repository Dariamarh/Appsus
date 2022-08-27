import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export class NoteAddVideo extends React.Component {
    state = {
        youTubeVideos: null
    }

    handleSearchChange = ({ target }) => {
        noteService.getVideos(target.value)
            .then((res) => {
                this.setState({ youTubeVideos: res })
            })
    }

    clearSearch = ({ target }) => {
        target.value = this.props.videoUrl
        this.setState({ youTubeVideos: null })
    }

    //Blur detectors
    isInputExit = () => {
    }

    isInputEntry = ({ target }) => {
    }

    render() {
        const { addNoteVideo, handleChange, clearInputs, setVideoUrl,
            elInputTitle, elInputVideoUrl } = this.props
        const { debounce } = utilService
        const { clearSearch, handleSearchChange } = this
        const { youTubeVideos } = this.state
        return <section
            className="note-add-video-container">
            <form
                className="form-note-add-video flex column"
                onSubmit={addNoteVideo}>
                <input
                    type="text"
                    name="title"
                    className="input-note-title"
                    placeholder="Enter title here"
                    ref={elInputTitle}
                    onChange={handleChange} />
                <div
                    className="video-search-bar-container">
                    <input
                        type="search"
                        name="videoUrl"
                        className="input-note-add-video"
                        placeholder="Search YouTube Here"
                        ref={elInputVideoUrl}
                        onBlur={debounce(clearSearch, 500)}
                        onChange={debounce(handleSearchChange, 1000)} />
                    {youTubeVideos && <ul
                        className="youtube-video-container">
                        {youTubeVideos.map(video => {
                            const { title, id } = video
                            return <li key={id}
                                className="youtube-video">
                                {title}
                                <i
                                    className="fa-solid fa-circle-plus btn-add-book"
                                    onClick={() => setVideoUrl(id)}></i>
                            </li>
                        })}
                    </ul>}
                </div>
                <button
                    className="btn-add-note"
                    onClick={clearInputs} >
                    <img
                        className="btn-add-note-img"
                        src="assets/img/add-icon.png" />
                </button>
            </form>
        </section>
    }
}

