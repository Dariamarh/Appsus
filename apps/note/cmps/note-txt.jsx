import { utilService } from '../../../services/util.service.js'

export class NoteTxt extends React.Component {

    state = {
        notes: [],
        inputExit: null,
        inputEntry: null,
        editState: null
    }

    componentDidMount() {
        if (this.props.note) {
            const { info } = this.props.note
            const { title, txt } = info
            this.setState({ title, txt })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        const { isNoteTxtUpdate } = this.props

        if (isNoteTxtUpdate) {
            if (this.props.note) {
                const { info } = this.props.note
                const { title, txt } = info
                this.setState({ title, txt })
            }
        }
        console.log('this.state.title NOTE TEXT ', this.state.title)
    }

    // addNoteTxt = (ev) => {
    //     if (ev) ev.preventDefault()

    //     // const { inputExit, inputEntry } = this.state
    //     // console.log('BEFORE', this.state)
    //     // if (!inputEntry && inputExit) {
    //     //     console.log('AFTER', this.state)
    //     // }
    //     // if (inputExit) console.log('AFTER', inputExit);

    //     const { title, txt } = this.state

    //     const { notes } = this.props
    //     notes.push(currNote)
    // }


    //Two way Data Binding
    // handleChange = ({ target }) => {
    //     const { value, name } = target
    //     this.setState({ [name]: value })
    // }

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

    onEditState = () => {
        this.setState({ editState: true })

    }

    offEditState = (id) => {
        this.setState({ editState: null })
        this.props.updateNoteTxt(id)
    }


    render() {
        const { isInputEntry, isInputExit, onEditState, offEditState } = this
        const { addNoteTxt, removeNote, note, handleChange } = this.props
        const { title, txt, editState } = this.state


        return <section className="note-text-container">
            <div className="note-text">
                {!note &&
                    <form onSubmit={addNoteTxt} className="form-note-txt flex column">
                        <input
                            type="text"
                            className="input-note-title"
                            name="title"
                            onChange={handleChange}
                            onClick={isInputEntry}
                            onBlur={isInputExit} />
                        <input
                            type="text"
                            className="input-note-text"
                            name="text"
                            onChange={handleChange}
                            onClick={isInputEntry}
                            onBlur={isInputExit} />

                        <button>Add Note</button>
                    </form>}

                {(note && !editState) &&
                    <div
                        className="note-text-content-container"
                        onClick={onEditState}>

                        <div className="rendered-note-text-container">
                            <div className="rendered-note-title">{title}</div>
                            <div className="rendered-note-txt">{txt}</div>
                        </div>

                    </div>}

                {(editState && note) && <div className="edit-container form-note-txt flex column">
                    <input
                        type="text"
                        className="input-note-title"
                        name="title"
                        onChange={handleChange}
                        onClick={isInputEntry}
                        onBlur={isInputExit} />
                    <input
                        type="text"
                        className="input-note-text"
                        name="text"
                        onChange={handleChange}
                        onClick={isInputEntry}
                        onBlur={isInputExit} />
                    <button
                        onClick={() => offEditState(note.id)}
                        className="btn-exit-edit-mode"
                    >Update</button>
                </div>}

                {note && <button
                    onClick={() => removeNote(note.id)}
                    className="btn-remove-note">🗑️</button>}
            </div>
        </section>
    }
}
