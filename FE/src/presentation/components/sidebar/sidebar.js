'use client'

import React from 'react'
import '@/presentation/assets/style/Global.css'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import SidebarButton from '@/presentation/components/sidebar_button/sidebar_button'
import './sidebar.css'
import reviewimage from '@/presentation/assets/image/review.png'
import Image from 'next/image'

const Sidebar = ({ children, activePage }) => {
	const router = useRouter()

	const userName = '너구리' // 회원가입 시 입력된 이름으로

	return (
		<div className="sidebar-layout-container">
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
					<div className="sidebar-head-logo-text-container">
						Consommé
					</div>
				</div>
				<div className="h-[10px]" />
				<div className="sidebar-text-box">
					<div className="sidebar-sub-text-container">Create</div>
				</div>
				<div className="h-[10px]" />
				<SidebarButton
					logotype="video"
					text="콘텐츠 소재"
					notactive={activePage !== 'recommned_page'}
					onClick={() => router.push('/recommned_page')}
				/>
				<SidebarButton
					logotype="box"
					text="소재 보관함"
					notactive={activePage !== 'archive_page'}
					onClick={() => router.push('/archive_page')}
				/>
				<div className="sidebar-footer">
					<div className="sidebar-review-box">
						<div className="sidebar-text-wrapper">
							도움이 되셨다면
							<br />
							간단한 사용후기를
							<br />
							남겨주시겠어요?
						</div>
						<div className="sidebar-custom-width" />
						<div className="sidebar-review-icon">
							<Image src={reviewimage} alt="Review Icon" />
						</div>
					</div>
					<div className="h-[10px]" />
					<div className="sidebar-id">
						{userName} 님{' '}
						<span className="sidebar-badge">Free Trial</span>
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
			<div className="sidebar-main-content">{children}</div>
		</div>
	)
}

export default Sidebar
