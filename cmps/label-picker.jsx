export class LabelPicker extends React.Component {

    state = {
        labels: ['ciritcal', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']
    }

    setLabel = (labelType) => {
        return labelType
    }

    render() {
        const { currLabel, removeLabel } = this.props
        return <div 
        className="label-container">
            {currLabel}
            <span 
            className="remove-label-span"
            onClick={() => { removeLabel(currLabel) }}
            >🏷️</span>
        </div>
    }

}