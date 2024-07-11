import React from 'react'
import './rect_button.css'
import '@/presentation/assets/style/Global.css'

const RectButton = ({ type = 'default', text, onClick, disabled }) => {
	return (
		<button
			className={`button-${type}`}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	)
}

export default RectButton
