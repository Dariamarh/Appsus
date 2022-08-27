export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            title: '',
            noteType: '',
        },
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        const { title, noteType } = this.state.filterBy
        const { handleChange } = this
        return <section
            className="note-filter-container flex justify-center">
            <form
                onSubmit={this.onFilter}
                className="note-filter-form">
                <label
                    htmlFor="name-input"
                    className="note-filter-label"
                >Title: 
                    <input
                        type="text"
                        name="title"
                        id="name-input"
                        className="input-note-filter"
                        placeholder="search by title"
                        onChange={handleChange}
                        value={title}
                    /></label>
                <label
                    htmlFor="note-type-input"
                    className="filter-note-type"
                >Note Type: 
                    <select
                        name="noteType"
                        id="note-type-input"
                        className="input-note-filter selector"
                        placeholder="set min price.."
                        value={noteType}
                        onChange={handleChange}>
                        <option value="note">All</option>
                        <option value="note-txt">Text</option>
                        <option value="note-img">Image</option>
                        <option value="note-video">Video</option>
                        <option value="note-todos">Todos list</option>
                    </select>
                </label>
            </form>
        </section>
    }
}