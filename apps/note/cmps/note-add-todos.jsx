export class NoteAddTodos extends React.Component {
    state = {
        inputExit: null,
        inputEntry: null,
    }

    //Blur detectors
    isInputExit = () => {
    }

    isInputEntry = ({ target }) => {
    }

    render() {
        const { addNoteTodos, handleChange, clearInputs, elInputTitle, elInputTodosList } = this.props
        const { isInputEntry, isInputExit } = this
        return <form
            onSubmit={addNoteTodos}
            id="add-note-todo-form"
            className="form-note-txt flex column">
            <input
                type="txt"
                name="title"
                className="input-note-todos-title"
                placeholder="Enter title here"
                ref={elInputTitle}
                onChange={handleChange}
                onClick={isInputEntry}
                onBlur={isInputExit} />
            <textarea
                type="todos-list"
                name="userAddTodos"
                className="input-note-todos-list"
                placeholder="Enter text here"
                ref={elInputTodosList}
                onChange={handleChange}
                onClick={isInputEntry}
                onBlur={isInputExit}>
            </textarea>
            <button
                className="btn-add-note"
                onClick={clearInputs} >
                <img
                    className="btn-add-note-img"
                    src="assets/img/add-icon.png" />
            </button>
        </form>
    }
}