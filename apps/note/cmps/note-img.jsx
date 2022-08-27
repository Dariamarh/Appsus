import { LabelPicker } from "../../../cmps/label-picker.jsx";
import { noteService } from "../services/note.service.js"


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

    componentDidUpdate(prevProps, prevState) {
        // console.log('COMPNENT DID UPDATE -- NOTE TEXT');

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

    updateNoteImg() {
        const { title, imgUrl } = this.state
        this.setState({ title, imgUrl })
    }


    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({ [name]: value })
        // console.log('HANDLE CHANGE');
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
        const { removeNote, note, pinNote, duplicateNote } = this.props
        const { onEditState, offEditState, isInputEntry, isInputExit, handleChange
            , toggleLabel, setLabel, removeLabel, gLabels } = this
        const { editState, title, imgUrl, backgroundColor, labels, isLabelsList } = this.state

        return <section className="note-img-container">
            {!editState && <div
                style={{ backgroundColor: backgroundColor }}
                className="note-img-content-container"
                onClick={onEditState}>

                <div className="note-img-title">{title}</div>
                <img
                    className="img-note"
                    src={imgUrl} /></div>}

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
                    name="imgUrl"
                    defaultValue={imgUrl}
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
        </section>
    }
}
