import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

export class NoteAddVideo extends React.Component {
    state = {
        youTubeVideos: null
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
        target.value = '👇Press to add👇'
        this.setState({ youTubeVideos: null })
    }


    render() {
        const { addNoteVideo, handleChange, clearInputs, setVideoUrl } = this.props
        const { debounce } = utilService
        const { clearSearch, handleSearchChange } = this
        const { youTubeVideos } = this.state

        return <section className="note-add-video-container">
            <form
                className="form-note-add-video flex column"
                onSubmit={addNoteVideo}>
                <input
                    className="input-note-title"
                    type="text"
                    name="title"
                    placeholder="Enter title here"
                    onChange={handleChange}
                />

                <div className="video-search-bar-container">
                    <input
                        type="search"
                        className="input-note-add-video"
                        title="blabl"
                        name="videoUrl"
                        placeholder="Search YouTube Here"
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
                    className="btn-add-note"
                    onClick={clearInputs}
                >Add Note</button>
            </form>
        </section>
    }
}

