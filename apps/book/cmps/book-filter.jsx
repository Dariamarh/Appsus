export class BookFilter extends React.Component {
    state = {
        filterBy: {
            name: '',
            minPrice: '',
            maxPrice: ''
        },
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
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
        const { name, minPrice, maxPrice } = this.state.filterBy
        return <section className="book-filter-container">
            <form onSubmit={this.onFilter} className="book-filter-form">
                <label htmlFor="name-input"
                    className="filter-label"
                >Name :</label>
                <input
                    type="text"
                    placeholder="search by name.."
                    className="input-filter"
                    id="name-input"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                />


                <label htmlFor="min-price-input"
                    className="filter-label"
                >Min-Price:</label>
                <input
                    type="number"
                    placeholder="set min price.."
                    className="input-filter"
                    id="min-price-input"
                    name="minPrice"
                    value={minPrice}
                    onChange={this.handleChange}
                />

                <label htmlFor="max-price-input"
                    className="filter-label"
                >Max-Price:</label>
                <input
                    type="number"
                    placeholder="set max price.."
                    className="input-filter"
                    id="max-price-input"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={this.handleChange}
                />

                {/* <button>Filter!</button> */}

            </form>
        </section>
    }
}