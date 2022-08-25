export class NoteImg extends React.Component {
    state = {
        editState: null,
    }

    componentDidMount() {
        const { info } = this.props.note
        const { title, imgUrl } = info
        this.setState({ title, imgUrl })


    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('COMPNENT DID UPDATE -- NOTE TEXT');
        const { isNoteUpdate } = this.props
        if (isNoteUpdate) {
            if (this.props.note) {
                const { info } = this.props.note
                const { title, imgUrl } = info
                this.setState({ title, imgUrl },
                    () => { console.log('this.state', this.state) })
            }
        }
    }

    onEditState = () => {
        this.setState({ editState: true })
    }

    offEditState = (id) => {
        this.setState({ editState: null })
        this.props.updateNoteImg(id)
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
        const { editState, title, imgUrl } = this.state

        return <section className="note-img-container">
            {!editState && <div
                className="note-txt-content-container"
                onClick={onEditState}>

                <div className="note-img-title">{title}</div>
                <img
                    className="img-note"
                    src={imgUrl} /></div>}

            {editState && <div className="edit-container form-note-txt flex column">
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
                    className="input-note-txt"
                    name="imgUrl"
                    defaultValue={imgUrl}
                    onChange={handleChange}
                    onClick={isInputEntry}
                    onBlur={isInputExit} />
                <button
                    onClick={() => offEditState(note.id)}
                    className="btn-exit-edit-mode"
                >Update</button>
            </div>}

            <button
                onClick={() => removeNote(note.id)}
                className="btn-remove-note">🗑️</button>
        </section>
    }
}
