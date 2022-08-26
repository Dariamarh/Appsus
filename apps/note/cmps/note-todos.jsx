import { utilService } from "../../../services/util.service.js"

export class NoteTodos extends React.Component {

    state = {
        editState: null,
    }

    componentDidMount() {
        const { info } = this.props.note
        const { title, todos } = info
        this.setState({ title, todos })
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('COMPNENT DID UPDATE -- NOTE TEXT');
        const { isNoteUpdate } = this.props
        if (isNoteUpdate) {
            if (this.props.note) {
                const { info } = this.props.note
                const { title, todos } = info
                this.setState({ title, todos })
            }
        }
    }

    onEditState = () => {
        this.setState({ editState: true })
    }

    offEditState = (id) => {
        this.setState({ editState: null })
        this.props.updateNoteTodos(id)
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

        const { onEditState, offEditState, isInputEntry, isInputExit } = this
        const { removeNote, note, handleChange } = this.props
        const { title, todos, editState } = this.state

        console.log('todos', todos)
        // console.log('getTodos()', getTodos())
        return <section className="note-txt-container">
            <div className="note-txt">
                {!editState &&
                    <div
                        className="note-txt-content-container"
                        onClick={onEditState}>
                        <div className="rendered-note-txt-container">
                            <div className="rendered-note-title">{title}</div>
                            <ol
                                type="1"
                                className="renderd-note-todos-list">
                                {title && todos.map(todo => <li
                                    key={utilService.makeId()}
                                    className="todo-container">
                                    {todo.txt}
                                </li>)}
                            </ol>
                        </div>
                    </div>}

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

                <button
                    onClick={() => removeNote(note.id)}
                    className="btn-remove-note">🗑️</button>
            </div>
        </section>
    }
}
