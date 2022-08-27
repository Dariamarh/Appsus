import { LabelPicker } from "../../../cmps/label-picker.jsx";

export class NoteTxt extends React.Component {

    state = {
        editState: null,
        labels: [],
        isLabelsList: false
    }

    gLabels = ['ciritcal', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']

    componentDidMount() {
        const { info, backgroundColor } = this.props.note
        const { title, txt } = info
        this.setState({ title, txt, backgroundColor })
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
    }

    isInputEntry = ({ target }) => {
    }

    updateNoteTxt() {
        const { title, txt } = this.state
        this.setState({ title, txt })
    }

    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({ [name]: value })
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
        const { onEditState, offEditState, isInputEntry, isInputExit, handleChange,
            toggleLabel, setLabel, removeLabel, gLabels } = this
        const { removeNote, note, pinNote, duplicateNote } = this.props
        const { title, txt, editState, backgroundColor, labels, isLabelsList } = this.state
        return <section
            style={{ backgroundColor: backgroundColor }}
            className="note-container">
            {note.isPinned && <div className="pin-div">
                <span
                    className="pin-note-span"
                    onClick={() => { pinNote(note) }}>
                    📌
                </span>
            </div>}
            {!editState &&
                <div
                    className="note-content-container"
                    onClick={onEditState}>
                    <div className="note-title">{title}</div>
                    <div className="note-txt-txt">{txt}</div>
                </div>}
            {editState && <div
                className="edit-container form-note-txt flex space-between">
                <div className="note-txt-inputs-container">
                    <input
                        type="txt"
                        name="title"
                        className="editor-input-note-title"
                        defaultValue={title}
                        onChange={handleChange}
                        onClick={isInputEntry}
                        onBlur={isInputExit} />
                    <input
                        type="txt"
                        name="txt"
                        className="editor-input-note-txt"
                        defaultValue={txt}
                        onChange={handleChange}
                        onClick={isInputEntry}
                        onBlur={isInputExit} />
                </div>
                <button
                    onClick={() => offEditState(note.id)}
                    className="btn-exit-edit-mode"
                >👍</button>
            </div>}
            <div
                className="note-btn-container flex">
                <i
                    className="color-picker-icon fa-solid fa-palette"></i>
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
                    className="btn-note">
                    <i class="fa-solid fa-thumbtack"></i>
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
