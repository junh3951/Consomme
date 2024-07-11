import React from 'react'
import './round_button.css'
import '@/presentation/assets/style/Global.css'

const RoundButton = ({ type = 'default', text, onClick, disabled }) => {
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

export default RoundButton
