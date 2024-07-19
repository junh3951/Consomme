import React, { useRef, useEffect } from 'react'
import './input_with_label.css'

const InputWithLabel = ({
	label,
	placeholder,
	type = 'text',
	value,
	onChange,
}) => {
	const textareaRef = useRef(null)

	useEffect(() => {
		if (type === 'textarea' && textareaRef.current) {
			const textarea = textareaRef.current
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
	}, [value, type])

	const handleInputChange = (e) => {
		if (type === 'textarea' && textareaRef.current) {
			const textarea = textareaRef.current
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}
		onChange(e)
	}

	return (
		<div className="iwl-input-container">
			<div className="iwl-label">{label}</div>
			{type === 'textarea' ? (
				<textarea
					ref={textareaRef}
					className="iwl-textarea-field"
					placeholder={placeholder}
					value={value}
					onChange={handleInputChange}
				/>
			) : (
				<input
					className="iwl-input-field"
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			)}
		</div>
	)
}

export default InputWithLabel
