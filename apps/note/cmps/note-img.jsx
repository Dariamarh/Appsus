import { LabelPicker } from "../../../cmps/label-picker.jsx";

export class NoteImg extends React.Component {
    state = {
        editState: null,
        labels: [],
        isLabelsList: false
    }

    gLabels = ['ciritcal', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']

    componentDidMount() {
        const { info, backgroundColor } = this.props.note
        const { title, imgUrl } = info
        this.setState({ title, imgUrl, backgroundColor })
    }

    onEditState = () => {
        this.setState({ editState: true })
    }

    offEditState = () => {
        this.setState({ editState: null })
        this.updateNoteImg
    }

    //Blur detectors
    isInputExit = () => {
    }

    isInputEntry = ({ target }) => {
    }

    updateNoteImg() {
        const { title, imgUrl } = this.state
        this.setState({ title, imgUrl })
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
        const { removeNote, note, pinNote, duplicateNote } = this.props
        const { onEditState, offEditState, isInputEntry, isInputExit, handleChange
            , toggleLabel, setLabel, removeLabel, gLabels } = this
        const { editState, title, imgUrl, backgroundColor, labels, isLabelsList } = this.state
        return <section
            className="note-container"
            style={{ backgroundColor: backgroundColor }} >
            {note.isPinned && <div className="pin-div">
                <span 
                className="pin-note-span"
                onClick={() => { pinNote(note) }}>
                    ????
                </span>
            </div>}
            {!editState && <div
                className="note-content-container"
                onClick={onEditState}>
                <div
                    className="note-title">{title}</div>
                <img
                    className="img-note"
                    src={imgUrl} /></div>}
            {editState && <div
                className="edit-container form-note-txt flex column">
                <img
                    className="img-note"
                    src={imgUrl} />
                <div className="note-img-inputs-btn-container flex">
                    <div className="note-img-inputs-container">
                        <input
                            type="txt"
                            name="title"
                            className="input-note-title"
                            defaultValue={title}
                            onChange={handleChange}
                            onClick={isInputEntry}
                            onBlur={isInputExit} />
                        <input
                            type="txt"
                            name="imgUrl"
                            className="input-note-txt"
                            defaultValue={imgUrl}
                            onChange={handleChange}
                            onClick={isInputEntry}
                            onBlur={isInputExit} />
                    </div>
                    <button
                        onClick={() => offEditState(note.id)}
                        className="btn-exit-edit-mode"
                    >????</button>
                </div>
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
                    onClick={toggleLabel}
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
