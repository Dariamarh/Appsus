export class LabelPicker extends React.Component {

    state = {
        labels: ['ciritcal', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']
    }

    setLabel = (labelType) => {
        // console.log('labelType', labelType)
        return labelType
    }


    render() {
        const { currLabel, removeLabel } = this.props
        // const { removeLabel } = this.state
        return <div>{currLabel}

            <span onClick={() => { removeLabel(currLabel) }}
            >✔️</span>
        </div>
    }

}