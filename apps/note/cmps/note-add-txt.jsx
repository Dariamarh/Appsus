export class NoteAddTxt extends React.Component {

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
        const { addNoteTxt, handleChange, clearInputs, elInputTitle, elInputTxt } = this.props
        const { isInputEntry, isInputExit } = this

        return <form onSubmit={addNoteTxt} className="form-note-txt flex column">
            <input
                type="txt"
                className="input-note-title"
                name="title"
                ref={elInputTitle}
                placeholder="Enter title here"
                onChange={handleChange}
                onClick={isInputEntry}
                onBlur={isInputExit} />
            <input
                type="txt"
                className="input-note-txt"
                name="txt"
                ref={elInputTxt}
                placeholder="Enter text here"
                onChange={handleChange}
                onClick={isInputEntry}
                onBlur={isInputExit} />
            <button
                className="btn-add-note"
                onClick={clearInputs}
            >Add Note</button>
        </form>
    }
}