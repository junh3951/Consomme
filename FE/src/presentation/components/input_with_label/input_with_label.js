import React from 'react'
import './input_with_label.css'

const InputWithLabel = ({ label, placeholder }) => {
	return (
		<div className="input-container">
			<div className="label">{label}</div>
			<input
				className="input-field"
				type="text"
				placeholder={placeholder}
			/>
		</div>
	)
}

export default InputWithLabel
