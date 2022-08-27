export class NoteAddTxt extends React.Component {

    state = {
        inputExit: null,
        inputEntry: null,
    }

    //Blur detectors - I WILL COME BACK!
    isInputExit = () => {
    }

    isInputEntry = ({ target }) => {
    }

    render() {
        const { addNoteTxt, handleChange, clearInputs, elInputTitle, elInputTxt } = this.props
        const { isInputEntry, isInputExit } = this
        return <form
            onSubmit={addNoteTxt}
            className="form-note-txt flex column">
            <input
                type="txt"
                name="title"
                className="input-note-title"
                placeholder="Enter title here"
                ref={elInputTitle}
                onChange={handleChange}
                onClick={isInputEntry}
                onBlur={isInputExit} />
            <textarea
                type="txt"
                name="txt"
                className="input-note-txt"
                placeholder="Enter text here"
                ref={elInputTxt}
                onChange={handleChange}
                onClick={isInputEntry}
                onBlur={isInputExit}>
            </textarea>
            <button
                className="btn-add-note"
                onClick={clearInputs} >
                <img
                    className="btn-add-note-img"
                    src="assets/img/add-icon.png"/>
            </button>
        </form>
    }
}