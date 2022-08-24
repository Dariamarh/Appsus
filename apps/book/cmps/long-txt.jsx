export function LongTxt({ text, toggleTxt }) {
    return <p className="details-description-long"> Description:{text}...
        <span className="span-toggle-txt" onClick={toggleTxt}>Show less</span>
    </p>
}