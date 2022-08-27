export class NoteAddTodos extends React.Component {
    state = {
        inputExit: null,
        inputEntry: null,
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
        const { addNoteTodos, handleChange, clearInputs, elInputTitle, elInputTodosList } = this.props
        const { isInputEntry, isInputExit } = this

        return <form onSubmit={addNoteTodos} id="add-note-todo-form" className="form-note-txt flex column">
            <input
                type="txt"
                className="input-note-title"
                name="title"
                ref={elInputTitle}
                placeholder="Enter title here"
                onChange={handleChange}
                onClick={isInputEntry}
                onBlur={isInputExit} />
            <textarea
                type="todos-list"
                className="input-note-todos-list"
                name="userAddTodos"
                ref={elInputTodosList}
                id="userAddTodos"
                placeholder="Enter text here"
                onChange={handleChange}
                onClick={isInputEntry}
                onBlur={isInputExit}>
            </textarea>
            <button
                className="btn-add-note"
                onClick={clearInputs}
            >Add Note</button>
        </form>
    }
}