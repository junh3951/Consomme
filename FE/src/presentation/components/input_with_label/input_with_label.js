import React from 'react'
import './input_with_label.css'

const InputWithLabel = ({
	label,
	placeholder,
	type = 'text',
	value,
	onChange,
}) => {
	return (
		<div className="iwl-input-container">
			<div className="iwl-label">{label}</div>
			<input
				className="iwl-input-field"
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}

export default InputWithLabel
