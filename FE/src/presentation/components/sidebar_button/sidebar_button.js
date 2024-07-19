import React from 'react'
import Icon from '@/presentation/assets/image/icon'
import './sidebar_button.css'

const SidebarButton = ({ logotype, text, notactive, onClick }) => {
	return (
		<div
			className={`sidebar-logo-box ${
				notactive ? 'sidebar-notactive' : ''
			}`}
			onClick={onClick}
			style={{ cursor: 'pointer' }}
		>
			<div className="sidebar-logo-container">
				<Icon type={logotype} className="sidebar-logo" />
			</div>
			<div
				className={`sidebar-logo-text-container ${
					notactive ? 'sidebar-text-notactive' : ''
				}`}
			>
				{text}
			</div>
		</div>
	)
}

export default SidebarButton
