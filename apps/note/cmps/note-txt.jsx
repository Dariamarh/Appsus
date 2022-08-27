export class NoteTxt extends React.Component {

    state = {
        editState: null,
    }

    componentDidMount() {
        const { info, backgroundColor } = this.props.note
        const { title, txt } = info
        this.setState({ title, txt, backgroundColor })
    }

    componentDidUpdate(prevProps, prevState) {

    }

    onEditState = () => {
        this.setState({ editState: true })
    }

    offEditState = () => {
        this.setState({ editState: null })
        this.updateNoteTxt
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

    updateNoteTxt() {
        const { title, txt } = this.state
        this.setState({ title, txt })
    }

    handleChange = ({ target }) => {
        // console.log('HANDLE CHANGE');
        const { value, name } = target
        this.setState({ [name]: value })
    }


    render() {
        const { onEditState, offEditState, isInputEntry, isInputExit, handleChange, } = this
        const { removeNote, note, pinNote,duplicateNote } = this.props
        const { title, txt, editState, backgroundColor } = this.state
        return <section className="note-txt-container">
            <div
                style={{ backgroundColor: backgroundColor }}
                className="note-txt">
                {!editState &&
                    <div
                        className="note-txt-content-container"
                        onClick={onEditState}>
                        <div className="rendered-note-txt-container">
                            <div className="rendered-note-title">{title}</div>
                            <div className="rendered-note-txt">{txt}</div>
                        </div>
                    </div>}

                {editState && <div
                    className="edit-container form-note-txt flex column">
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
                        name="txt"
                        defaultValue={txt}
                        onChange={handleChange}
                        onClick={isInputEntry}
                        onBlur={isInputExit} />
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
                    onClick={() => { pinNote(note) }}
                    className="btn-pin-note">📌</button>
                     <button
                    onClick={() => {duplicateNote(note) }}
                    className="btn-duplicate-note"><i className="fa-solid fa-clone"></i></button>
                <button
                    onClick={() => removeNote(note.id)}
                    className="btn-remove-note">🗑️</button>
                    
            </div>
        </section>
    }
}
