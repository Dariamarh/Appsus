import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { NoteAdd } from "../cmps/note-add.jsx";

export class NoteIndex extends React.Component {
    state = {
        notes: [],
        title: 'Click to update title 👋',
        txt: 'Click to update text 👋',
        isNoteUpdate: null,
        imgUrl: 'assets/img/white-horse.png',
        videoUrl: 'https://www.youtube.com/watch?v=Z3TIhMGQ_8k&'
    }

    componentDidMount() {
        this.loadNotes()
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('COMPONENT DID UPDATE');
        // console.log('this.state.imgUrl', this.state.imgUrl)
        if (this.state.isNoteUpdate) {
            this.loadNotes()
            this.setState({ isNoteUpdate: null })
        }
    }


    loadNotes = () => {
        // console.log('LOAD NOTES');
        let currNotes = this.state.notes
        if (!this.state.notes.length) currNotes = noteService.getNotes()
        this.setState({ notes: currNotes })
    }

    // NOTE VIDEO FUNCS

    addNoteVideo = (ev) => {
        // console.log('ADD NOTE IMG');
        ev.preventDefault()
        const { title, videoUrl } = this.state
        const { notes } = this.state
        const { createNoteImg } = noteService

        this.setState({
            notes: [createNoteImg(title, videoUrl), ...notes]
        },
            this.setState({
                title: 'Click to update title 👋',
                videoUrl: 'https://www.youtube.com/watch?v=Z3TIhMGQ_8k&'
            }))

    }

    updateNoteVideo = (id) => {
        const { notes, title, videoUrl } = this.state
        const currIdx = notes.findIndex(note => note.id === id)
        const currNote = noteService.getById(notes, id)
        currNote.info.title = title
        currNote.info.videoUrl = videoUrl
        notes[currIdx] = currNote
        this.setState(notes[currIdx],
            () => {
                this.setState({
                    isNoteUpdate: true,
                    title: 'Click to update title 👋',
                    txt: 'Click to update text 👋'
                })
            })
    }

    // NOTE IMAGE FUNCS
    addNoteImg = (ev) => {
        // console.log('ADD NOTE IMG');
        ev.preventDefault()
        const { title, imgUrl } = this.state
        const { notes } = this.state
        const { createNoteImg } = noteService

        this.setState({
            notes: [createNoteImg(title, imgUrl), ...notes]
        },
            this.setState({
                title: 'Click to update title 👋',
                imgUrl: 'assets/img/white-horse.png'
            }))

    }

    updateNoteImg = (id) => {
        const { notes, title, imgUrl } = this.state
        const currIdx = notes.findIndex(note => note.id === id)
        const currNote = noteService.getById(notes, id)
        currNote.info.title = title
        currNote.info.imgUrl = imgUrl
        notes[currIdx] = currNote
        this.setState(notes[currIdx],
            () => {
                this.setState({
                    isNoteUpdate: true,
                    title: 'Click to update title 👋',
                    txt: 'Click to update text 👋'
                })
            })
    }

    // NOTE TEXT FUNCS
    addNoteTxt = (ev) => {
        // console.log('ADD NOTE TEXT');
        if (ev) ev.preventDefault()
        const { title, txt } = this.state
        const { notes } = this.state
        const { createNoteTxt } = noteService
        this.setState({ notes: [createNoteTxt(title, txt), ...notes] },
            this.setState({
                title: 'Click to update title 👋',
                txt: 'Click to update text 👋'
            }))
    }

    updateNoteTxt = (id) => {
        const { notes, title, txt } = this.state
        const currIdx = notes.findIndex(note => note.id === id)
        const currNote = noteService.getById(notes, id)
        currNote.info.title = title
        currNote.info.txt = txt
        notes[currIdx] = currNote
        this.setState(notes[currIdx],
            () => {
                this.setState({
                    isNoteUpdate: true,
                    title: 'Click to update title 👋',
                    txt: 'Click to update text 👋'
                })
            })
    }

    removeNote = (id) => {
        let notes = this.state.notes
        notes = notes.filter(note => note.id !== id)
        this.setState({ notes })
    }

    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({ [name]: value })
        // console.log('HANDLE CHANGE');
    }

    clearInputs = (ev) => {
        const elInputTitle = document.querySelector('.input-note-title')
        elInputTitle.value = ''
        const elInputTxt = document.querySelector('.input-note-txt')
        if (elInputTxt) elInputTxt.value = ''
        const elInputImgUrl = document.querySelector('.input-note-img-url')
        if (elInputImgUrl) elInputImgUrl.value = ''
    }

    render() {
        const { notes, title, txt, isNoteUpdate } = this.state
        const { addNoteTxt, addNoteImg, addNoteVideo,
            updateNoteTxt, updateNoteImg, updateNoteVideo,
            removeNote, handleChange,
            clearInputs } = this
        return <section className="note-app">
            <NoteAdd
                clearInputs={clearInputs}
                handleChange={handleChange}
                addNoteVideo={addNoteVideo}
                addNoteImg={addNoteImg}
                addNoteTxt={addNoteTxt} />
            <hr />
            <NoteList
                handleChange={handleChange}
                isNoteUpdate={isNoteUpdate}
                updateNoteVideo={updateNoteVideo}
                updateNoteImg={updateNoteImg}
                updateNoteTxt={updateNoteTxt}
                removeNote={removeNote}
                notes={notes} />
        </section>
    }
}
