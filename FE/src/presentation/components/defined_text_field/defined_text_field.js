import React from 'react'
import './defined_text_field.css'

const DefinedField = ({ label, value }) => {
	return (
		<div className="display-container">
			<div className="label">{label}</div>
			<div className="display-field">{value}</div>
		</div>
	)
}

export default DefinedField
