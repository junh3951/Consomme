import React from 'react'
import './defined_text_field.css'

const DefinedField = ({ label, value }) => {
	return (
		<div className="dt-display-container">
			<div className="dt-label">{label}</div>
			<div className="dt-display-field">{value}</div>
		</div>
	)
}

export default DefinedField
