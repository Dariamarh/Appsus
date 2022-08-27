import { utilService } from "../../../services/util.service.js"
import { LabelPicker } from "../../../cmps/label-picker.jsx";
import { noteService } from "../services/note.service.js"

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

    componentDidMount() {
        const { info, backgroundColor } = this.props.note
        const { title, todos } = info
        this.setState({ title, todos, backgroundColor })
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('COMPONENT DID UPDATE TODOS');
        // console.log('this.state.todos', this.state.todos)
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
        // console.log('EXIT');
        // this.setState({ inputExit: true }, () => {
        //     this.addNoteTxt()
        // })
        // this.state.inputExit = true
        // this.state.inputEntry = null
        // this.addNoteTxt()
    }

    isInputEntry = ({ target }) => {
        this.setState({ renderTodosForEdit: null })
        // console.log('ENTRY');
        // this.setState({ inputEntry: true })
        // this.state.inputEntry = true
        // this.state.inputExit = null
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
        this.setState({ isInstantTodo: true })
    }

    onInstantTodo = () => {
        let { todos } = this.state
        this.setState({ todos: [...todos, { txt: this.state.instantTodo, doneAt: null }] })
        this.setState({ isInstantTodo: null })
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
        // console.log('HANDLE CHANGE');
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
        const { labels } = this.state
        if (labels.find(label => label === target.id)) return
        labels.push(target.id)
        this.setState({ labels })
    }


    removeLabel = (currLabel) => {
        let { labels } = this.state
        labels = labels.filter(label => label !== currLabel)
        this.setState({ labels })
    }


    render() {
        const { onEditState, offEditState, isInputEntry, isInputExit, isAddInstantTodo, onInstantTodo, handleChange, toggleTodo, removeTodo,
            toggleLabel, setLabel, removeLabel, gLabels } = this
        const { removeNote, note, pinNote, duplicateNote } = this.props
        const { title, todos, editState, isInstantTodo, backgroundColor, labels, isLabelsList } = this.state

        return <section className="note-txt-container">
            <div className="note-txt">
                {!editState &&
                    <div
                        style={{ backgroundColor: backgroundColor }}
                        className="note-txt-content-container"
                    >
                        <div className="rendered-note-txt-container">
                            <div
                                onClick={onEditState}
                                className="rendered-note-title">{title}</div>
                            <ul
                                type="1"
                                className="renderd-note-todos-list">
                                {title && todos.map(todo => <li
                                    className="todo-container flex space-between"
                                    key={todo.id}>
                                    <div
                                        onClick={() => toggleTodo(todo.id)}
                                        className={todo.doneAt && 'done'}>
                                        {todo.txt}
                                        <span className="span-done-at"> {todo.doneAt}</span>
                                    </div>
                                    <span
                                        onClick={() => { removeTodo(todo.id) }}
                                        className="btn-remove-todo">🗑️</span>

                                </li>)}
                            </ul>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="instantTodo"
                                onClick={isAddInstantTodo}
                                placeholder="I need todo....🤔"
                                className="input-add-instant-todo" />
                            {isInstantTodo && <button
                                onClick={onInstantTodo}
                                className="btn-add-instant-todo"
                            > <i className="fa-solid fa-circle-plus btn-add-book"
                            ></i>
                            </button>}
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
                    <textarea
                        type="txt"
                        ref={this.inputTodosEditor}
                        className="input-note-todos"
                        name="todosForEdit"
                        defaultValue={this.getTodosForEdit()}
                        onChange={handleChange}
                        onClick={isInputEntry}
                        onBlur={isInputExit} >
                    </textarea>
                    <button
                        onClick={offEditState}
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
                    className="btn-edit-video"
                    onClick={onEditState}
                >✏️</button>
                <button
                    onClick={() => { pinNote(note) }}
                    className="btn-pin-note">📌</button>
                <button
                    onClick={() => { duplicateNote(note) }}
                    className="btn-duplicate-note"><i className="fa-solid fa-clone"></i></button>
                <button
                    onClick={() => { toggleLabel('work') }}
                >Label</button>
                {isLabelsList && <ul className="labels-list-container">

                    {gLabels.map(label => {
                        return <li
                            key={label}
                            id={label}
                            className="label-container"
                            onClick={setLabel}>
                            {label}</li>
                    })}
                </ul>}

                {labels.map(label => <LabelPicker
                    key={label}
                    labels={labels}
                    removeLabel={removeLabel}
                    currLabel={label} />)}
                <button
                    onClick={() => removeNote(note.id)}
                    className="btn-remove-note">🗑️</button>
            </div>
        </section>
    }
}
