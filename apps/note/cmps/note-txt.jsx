export class NoteTxt extends React.Component {

    state = {
        notes: [],
        isBlurOffTitle: null,
        title: '',
        isBlurOffText: null,
        text: ''
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
        //     this.loadBook()
        // }
    }
    addNoteTxt = (ev) => {
        ev.preventDefault()
        console.log('ev', ev)
        const { target } = ev
        const { value } = target
        console.log(value);
    }

    setTitle = ({ target }) => {
        const { isBlurOffText, isBlurOffTitle, title, text } = this.state
        this.setState({ isBlurOffTitle: true })

        // console.log('isBlurOffTitle', isBlurOffTitle)
        // if (!isBlurOffText && !isBlurOffTitle) return
        // console.log('title: ', value);
        
        const value = target.value
        this.setState({ title: value })
    }
    
    setText = ({ target }) => {
        const { isBlurOffText, isBlurOffTitle } = this.state
        this.setState({ isBlurOffText: true })
        
        // if (!isBlurOffText && !isBlurOffTitle) return
        // console.log('text: ', value);
        
        const value = target.value
        this.setState({ text: value })

    }

    render() {
        const { addNoteTxt, setTitle, setText } = this
        return <section className="note-text-container">
            <div className="note-text">
                <form onSubmit={addNoteTxt} className="form-note-txt flex column">
                    <input
                        type="text"
                        className="input-note-title"
                        name="input-note-title"
                        onBlur={setTitle} />
                    <input
                        type="text"
                        className="input-note-text"
                        name="input-note-text"
                        onBlur={setText} />
                    <button>Add Note</button>
                </form>
            </div>
        </section>
    }
}
