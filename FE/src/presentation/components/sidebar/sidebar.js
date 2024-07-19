'use client'

import React, { useEffect, useState } from 'react'
import '@/presentation/assets/style/Global.css'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import SidebarButton from '@/presentation/components/sidebar_button/sidebar_button'
import './sidebar.css'
import reviewimage from '@/presentation/assets/image/review-coffee.svg'
import Image from 'next/image'

const Sidebar = ({ children, activePage }) => {
	const router = useRouter()
	const [userName, setUserName] = useState('')

	useEffect(() => {
		const email = localStorage.getItem('currentUserEmail')
		if (email) {
			const user = JSON.parse(localStorage.getItem(email))
			if (user && user.name) {
				setUserName(user.name)
			}
		}
	}, [])

	return (
		<div className="sidebar-left-sidebar">
			<div className="h-[90px]" />
			<div
				className="sidebar-head-logo-box"
				onClick={() => router.push('/recommned_page')}
				style={{ cursor: 'pointer' }}
			>
				<div className="sidebar-head-logo-container">
					<Icon type="logo-icon" className="sidebar-head-logo" />
				</div>
				<div className="sidebar-head-logo-text-container">Consommé</div>
			</div>
			<div className="h-[10px]" />
			<div className="sidebar-text-box">
				<div className="sidebar-sub-text-container">Create</div>
			</div>
			<div className="h-[10px]" />
			<SidebarButton
				logotype="video"
				text="콘텐츠 소재"
				// notactive={activePage !== 'recommned_page'}
				onClick={() => router.push('/recommned_page')}
			/>
			<SidebarButton
				logotype="box"
				text="소재 보관함"
				// notactive={activePage !== 'archive_page'}
				onClick={() => router.push('/archive_page')}
			/>
			<div className="sidebar-footer">
				<div className="sidebar-review-box" onClick={() => window.location.href = 'https://forms.gle/PUbpLDRAmuEDhfLEA'} // 링크를 지정합니다.
					style={{ cursor: 'pointer' }}
				>
					<div className="sidebar-text-wrapper">
						사용후기를 남기면
						<br />
						추첨을 통해
						<br />
						아.아를 드립니다!
					</div>
					<div className="sidebar-custom-width" />
					<div className="sidebar-review-icon">
						<Image src={reviewimage} alt="Review Icon" />
					</div>
				</div>
				<div className="h-[10px]" />
				<div className="sidebar-id">
					{userName} 님{' '}
					<span className="sidebar-badge">무료 버전</span>
				</div>
				<div className="h-[10px]" />
				<SidebarButton
					logotype="logout"
					text="로그아웃"
					notactive={true}
					onClick={() => router.push('/')}
				/>
			</div>
			<div className="h-[10px]" />
		</div>
	)
}

export default Sidebar
