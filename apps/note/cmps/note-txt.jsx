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
        // console.log("UPDATE");
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


    render() {
        const { isInputEntry, isInputExit, onEditState } = this
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
                        {!note &&
                            <button>Add Note</button>
                        }
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

                {editState && <div className="edit-container">
                    EDIT DIV
                </div>}

                {note && <button
                    onClick={() => removeNote(note.id)}
                    className="btn-remove-note">🗑️</button>}
            </div>
        </section>
    }
}
