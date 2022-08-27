import { utilService } from "../../../services/util.service.js"
import { LabelPicker } from "../../../cmps/label-picker.jsx";

export class NoteTodos extends React.Component {

    state = {
        editState: null,
        isInstantTodo: null,
        renderTodosForEdit: true,
        todosForEdit: '',
        instantTodo: '',
        labels: [],
        isLabelsList: false
    }

    gLabels = ['ciritcal', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']

    inputTodosEditor = React.createRef()
    inputInstantTodo = React.createRef()

    componentDidMount() {
        const { info, backgroundColor } = this.props.note
        const { title, todos } = info
        this.setState({ title, todos, backgroundColor })
    }

    onEditState = () => {
        this.setState({ editState: true })
    }

    offEditState = () => {
        this.setState({ editState: null })
        this.updateNoteTodos()
    }

    //Blur detectors
    isInputExit = () => {
    }

    isInputEntry = ({ target }) => {
        this.setState({ renderTodosForEdit: null })
    }

    getTodosForEdit() {
        const { renderTodosForEdit } = this.state
        if (!renderTodosForEdit) return
        const { todos } = this.state
        let todosForEdit = todos.map(todo => {
            return todo.txt
        })
        todosForEdit = todosForEdit.join('\n')
        this.state.todosForEdit = todosForEdit
        return todosForEdit
    }

    isAddInstantTodo = () => {
        let { isInstantTodo } = this.state
        isInstantTodo = !isInstantTodo
        this.setState({ isInstantTodo })
    }

    onInstantTodo = () => {
        let { todos } = this.state
        this.setState({
            todos: [...todos,
            {
                txt: this.state.instantTodo,
                doneAt: null,
                id: utilService.makeId()
            }]
        })
        this.setState({ isInstantTodo: null })
        this.inputInstantTodo.current.value = ''
    }

    offAddInstantTodo = () => {
        this.setState({ isInstantTodo: null })
        this.inputInstantTodo.current.value = ''
    }

    updateNoteTodos() {
        let { title, todos, todosForEdit } = this.state
        let todosTxts
        todosTxts = todosForEdit.split('\n')
        for (let i = 0; i < todosTxts.length; i++) {
            if (i > (todos.length - 1)) {
                todos[i] = { txt: '', doneAt: null, id: utilService.makeId() }
            }
            todos[i].txt = todosTxts[i];
        }
        this.setState({ renderTodosForEdit: true, title, todos })
    }

    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({ [name]: value })
    }

    toggleTodo = (id) => {
        const { todos } = this.state
        const currIdx = todos.findIndex(todo => todo.id === id)
        const currTodo = todos.find(todo => todo.id === id)
        if (!currTodo.doneAt) {
            currTodo.doneAt = utilService.createdAt(Date.now())
            todos[currIdx] = currTodo
            this.setState({ todos })
            return
        }
        if (currTodo.doneAt) {
            currTodo.doneAt = null
            todos[currIdx] = currTodo
            this.setState({ todos })
            return
        }
    }

    removeTodo = (id) => {
        let { todos } = this.state
        todos = todos.filter(todo => todo.id !== id)
        this.setState({ todos })
    }

    toggleLabel = () => {
        let { isLabelsList } = this.state
        isLabelsList = !isLabelsList
        this.setState({ isLabelsList })
    }

    setLabel = ({ target }) => {
        let { labels, isLabelsList } = this.state
        if (labels.find(label => label === target.id)) return
        labels.push(target.id)
        isLabelsList = false
        this.setState({ labels, isLabelsList })
    }

    removeLabel = (currLabel) => {
        let { labels } = this.state
        labels = labels.filter(label => label !== currLabel)
        this.setState({ labels })
    }

    render() {
        const { onEditState, offEditState, isInputEntry, isInputExit, isAddInstantTodo,
            onInstantTodo, handleChange, toggleTodo, removeTodo,
            toggleLabel, setLabel, removeLabel, gLabels, inputInstantTodo, offAddInstantTodo } = this
        const { removeNote, note, pinNote, duplicateNote } = this.props
        const { title, todos, editState, isInstantTodo, backgroundColor,
            labels, isLabelsList } = this.state

        return <section
            className="note-container"
            style={{ backgroundColor: backgroundColor }}>
            {note.isPinned && <div className="pin-div">
                <span
                    className="pin-note-span"
                    onClick={() => { pinNote(note) }}>
                    📌
                </span>
            </div>}
            {!editState &&
                <div
                    className="note-content-container" >
                    <div
                        className="note-title"
                        onClick={onEditState}>{title}
                    </div>
                    <ul
                        className="note-todos-list">
                        {title && todos.map(todo => <li
                            key={todo.id}
                            className="todo-container flex space-between">
                            <div
                                className={todo.doneAt && 'done'}
                                onClick={() => toggleTodo(todo.id)}>
                                {todo.txt}
                                <span
                                    className="span-done-at">
                                    {todo.doneAt}
                                </span>
                            </div>
                            <span
                                className="btn-remove-todo"
                                onClick={() => { removeTodo(todo.id) }}>
                                🗑️
                            </span>
                        </li>)}
                    </ul>
                    <div
                        className="instant-todo-container flex">
                        <div
                            className="instant-todo-input-container">
                            <input
                                type="text"
                                name="instantTodo"
                                ref={inputInstantTodo}
                                className="input-add-instant-todo"
                                placeholder="I need todo....🤔"
                                onChange={handleChange}
                                onBlur={offAddInstantTodo}
                                onClick={isAddInstantTodo} />
                        </div>
                        {isInstantTodo && <span
                            onClick={onInstantTodo}
                            className="btn-add-instant-todo">
                            ➕
                        </span>}
                    </div>
                </div>}
            {editState && <div
                className="edit-container form-note-txt flex column">
                <input
                    type="txt"
                    name="title"
                    className="input-note-todos-title"
                    defaultValue={title}
                    onChange={handleChange}
                    onClick={isInputEntry}
                    onBlur={isInputExit} />
                <textarea
                    type="txt"
                    name="todosForEdit"
                    className="editor-input-note-todos"
                    ref={this.inputTodosEditor}
                    defaultValue={this.getTodosForEdit()}
                    onChange={handleChange}
                    onClick={isInputEntry}
                    onBlur={isInputExit} >
                </textarea>
                <button
                    onClick={offEditState}
                    className="btn-note-todos-exit-edit-mode"
                >👍👍</button>
            </div>}
            <div
                className="note-btn-container flex">
                <i className="color-picker-icon fa-solid fa-palette"></i>
                <input
                    type="color"
                    name="backgroundColor"
                    className="color-picker"
                    onChange={handleChange} />
                <button
                    className="btn-note"
                    onClick={onEditState}
                ><i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                    onClick={() => { pinNote(note) }}
                    className="btn-note"><i class="fa-solid fa-thumbtack"></i>
                </button>
                <button
                    onClick={() => { duplicateNote(note) }}
                    className="btn-note"><i className="fa-solid fa-clone"></i>
                </button>
                <button
                    className="btn-note"
                    onClick={() => { toggleLabel('work') }}
                ><i className="fa-solid fa-tag"></i>
                </button>
                {isLabelsList && <ul
                    className="labels-list-container">
                    {gLabels.map(label => {
                        return <li
                            key={label}
                            id={label}
                            className="label-container"
                            onClick={setLabel}>
                            {label}</li>
                    })}
                </ul>}
                <button
                    onClick={() => removeNote(note.id)}
                    className="btn-note"><i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
            {labels.map(label => <LabelPicker
                key={label}
                labels={labels}
                currLabel={label}
                removeLabel={removeLabel} />)}
        </section>
    }
}
