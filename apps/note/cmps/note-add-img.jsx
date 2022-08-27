export class NoteAddImg extends React.Component {
    render() {
        const { addNoteImg, handleChange, clearInputs, elInputTitle, elInputImgUrl } = this.props
        return <section className="note-add-img-container">
            <form
                className="form-note-add-img flex column"
                onSubmit={addNoteImg}>
                <input
                    className="input-note-title"
                    type="text"
                    ref={elInputTitle}
                    name="title"
                    placeholder="Enter title here"
                    onChange={handleChange}
                />
                <input
                    className="input-note-img-url"
                    type="text"
                    name="imgUrl"
                    ref={elInputImgUrl}
                    id=""
                    placeholder="Enter image url"
                    onChange={handleChange}
                />
                <button
                    className="btn-add-note"
                    onClick={clearInputs}
                >Add Note</button>
            </form>
        </section>
    }
}