import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './bubble_buttons.css'

const BubbleButtons = ({ trends, selectedTrend, onTrendClick }) => {
	const [positions, setPositions] = useState([])

	useEffect(() => {
		const newPositions = []
		const gridCols = 3 // Number of columns in the grid
		const bubbleSize = 10 // Base size for the bubbles
		const spacing = 15 // Spacing between bubbles

		trends.forEach((_, index) => {
			const row = Math.floor(index / gridCols)
			const col = index % gridCols
			const x = col * (bubbleSize + spacing)
			const y = row * (bubbleSize + spacing)
			const size = bubbleSize + 5 * index // Adjust size based on index or other criteria

			newPositions.push({ x, y, size })
		})

		setPositions(newPositions)
	}, [trends])

	return (
		<div className="bubble-circle-container">
			{trends.map((trend, index) => (
				<button
					key={`${trend}-${index}`}
					className={`bubble-circle bubble-circle-${index + 1} ${
						selectedTrend === trend ? 'highlight' : 'animate'
					}`}
					style={{ animationDelay: `${index * 0.1}s` }} // Dynamic animation delay
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
