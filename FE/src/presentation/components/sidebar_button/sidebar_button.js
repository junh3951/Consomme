import React from 'react'
import Icon from '@/presentation/assets/image/icon'
import './sidebar_button.css'

const SidebarButton = ({ logotype, text, disabled }) => {
	return (
		<div className={`logo-box ${disabled ? 'disabled' : ''}`}>
			<div className="logo-container">
				<Icon type={logotype} className="logo" />
			</div>
			<div
				className={`logo-text-container ${
					disabled ? 'text-disabled' : ''
				}`}
			>
				{text}
			</div>
		</div>
	)
}

export default SidebarButton
