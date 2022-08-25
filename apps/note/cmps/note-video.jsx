export class NoteVideo extends React.Component {

    state = {
        editState: null,
    }

    componentDidMount() {
        const { info } = this.props.note
        const { title, videoUrl } = info
        this.setState({ title, videoUrl })


    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('COMPNENT DID UPDATE -- NOTE TEXT');
        const { isNoteUpdate } = this.props
        if (isNoteUpdate) {
            if (this.props.note) {
                const { info } = this.props.note
                const { title, videoUrl } = info
                this.setState({ title, videoUrl },
                    () => { console.log('this.state', this.state) })
            }
        }
    }

    onEditState = () => {
        this.setState({ editState: true })
    }

    offEditState = (id) => {
        this.setState({ editState: null })
        this.props.updateNoteVideo(id)
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


    render() {
        const { removeNote, handleChange, note } = this.props
        const { onEditState, offEditState, isInputEntry, isInputExit } = this
        const { editState, title, videoUrl } = this.state

        return <section className="note-img-container">
            {!editState && <div
                className="note-txt-content-container"
            >

                <div className="note-img-title">{title}</div>


                <iframe width="420" height="315"
                    src={videoUrl}>
                </iframe>
            </div>}

            {editState && <div className="edit-container form-note-video flex column">
                <input
                    type="txt"
                    className="input-note-title"
                    name="title"
                    defaultValue={title}
                    onChange={handleChange}
                    onClick={isInputEntry}
                    onBlur={isInputExit} />
                <input
                    type="txt"
                    className="input-note-video"
                    name="videoUrl"
                    defaultValue={videoUrl}
                    onChange={handleChange}
                    onClick={isInputEntry}
                    onBlur={isInputExit} />
                <button
                    onClick={() => offEditState(note.id)}
                    className="btn-exit-edit-mode"
                >Update</button>
            </div>}

            <button
                className="btn-edit-video"
                onClick={onEditState}
            >✏️</button>
            <button
                onClick={() => removeNote(note.id)}
                className="btn-remove-note">🗑️</button>
        </section>
    }
}


