export class NoteAddImg extends React.Component {
    render() {
        const { addNoteImg, handleChange, clearInputs, elInputTitle, elInputImgUrl } = this.props
        return <section className="note-add-img-container ">
            <form
                className="form-note-add-img flex column"
                onSubmit={addNoteImg}>
                <input
                    type="text"
                    name="title"
                    className="input-note-title"
                    placeholder="Enter title here"
                    ref={elInputTitle}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="imgUrl"
                    className="input-note-img-url"
                    placeholder="Enter image url"
                    ref={elInputImgUrl}
                    onChange={handleChange} />
                <button
                    className="btn-add-note"
                    onClick={clearInputs} >
                    <img
                        className="btn-add-note-img"
                        src="assets/img/add-icon.png" />
                </button>
            </form>
        </section>
    }
}