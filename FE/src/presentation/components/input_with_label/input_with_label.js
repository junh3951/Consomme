import React from 'react'
import './input_with_label.css'

const InputWithLabel = ({ label, placeholder, type = 'text' }) => {
	return (
		<div className="input-container">
			<div className="label">{label}</div>
			<input
				className="input-field"
				type={type}
				placeholder={placeholder}
			/>
		</div>
	)
}

export default InputWithLabel
