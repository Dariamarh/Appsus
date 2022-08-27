export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            title: '',
            noteType: '',
            label: ''
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

    // onFilter = (ev) => {
    //     ev.preventDefault()
    //     this.props.onSetFilter(this.state.filterBy)
    // }


    render() {
        const { title, noteType, label } = this.state.filterBy
        const { handleChange } = this
        return <section className="note-filter-container">
            <form onSubmit={this.onFilter} className="note-filter-form">
                <label htmlFor="name-input"
                    className="note-filter-label"
                >Title :
                    <input
                        type="text"
                        placeholder="search by title"
                        className="input-filter"
                        id="name-input"
                        name="title"
                        value={title}
                        onChange={handleChange}
                    /></label>


                <label htmlFor="note-type-input"
                    className="filter-note-type"
                >Note Type:
                    <select
                        placeholder="set min price.."
                        className="input-filter"
                        id="note-type-input"
                        name="noteType"
                        value={noteType}
                        onChange={handleChange}>
                        <option value="note-txt">Text</option>
                        <option value="note-img">Image</option>
                        <option value="note-video">Video</option>
                        <option value="note-todos">Todos list</option>
                    </select>
                </label>

                <label htmlFor="label-input"
                    className="filter-label"
                >Label:
                    <select
                        placeholder="set min price.."
                        className="input-filter"
                        id="label-input"
                        name="label"
                        value={label}
                        onChange={handleChange}>
                        <option value="label-critical">Critical</option>
                        <option value="label-family">Family</option>
                        <option value="label-work">Work</option>
                        <option value="label-friends">Friends</option>
                        <option value="label-spam">Spam</option>
                        <option value="label-memories">Memories</option>
                        <option value="label-romantic">Romantic</option>
                    </select></label>

                {/* <button>Filter!</button> */}

            </form>
        </section>
    }
}