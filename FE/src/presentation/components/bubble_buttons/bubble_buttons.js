import React from 'react'
import PropTypes from 'prop-types'
import './bubble_buttons.css'

const BubbleButtons = ({ trends, selectedTrend, onTrendClick }) => {
	return (
		<div className="bubble-circle-container">
			{trends.map((trend, index) => (
				<button
					key={index}
					className={`bubble-circle bubble-circle-${index + 1} ${
						selectedTrend === trend ? 'highlight' : ''
					}`}
					onClick={() => onTrendClick(trend)}
				>
					{trend}
				</button>
			))}
		</div>
	)
}

BubbleButtons.propTypes = {
	trends: PropTypes.array.isRequired,
	selectedTrend: PropTypes.string,
	onTrendClick: PropTypes.func.isRequired,
}

export default BubbleButtons
