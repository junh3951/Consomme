import React from 'react'
import Icon from '@/presentation/assets/image/icon'
import './sidebar_button.css'

const SidebarButton = ({ logotype, text, notactive, onClick }) => {
	return (
		<div
			className={`logo-box ${notactive ? 'notactive' : ''}`}
			onClick={onClick}
			style={{ cursor: 'pointer' }}
		>
			<div className="logo-container">
				<Icon type={logotype} className="logo" />
			</div>
			<div className={`logo-text-container ${notactive ? 'text-notactive' : ''}`}>
				{text}
			</div>
		</div>
	)
}

export default SidebarButton
