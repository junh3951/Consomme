'use client'

import './page.css'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import RectButton from '@/presentation/components/rect_button/rect_button'
import RoundButton from '@/presentation/components/round_button/round_button'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'
import SidebarButton from '@/presentation/components/sidebar_button/sidebar_button'

function App() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-white">
			<div className="left-sidebar">
				<div className="h-[90px]" />
				<div className="head-logo-box">
					<div className="head-logo-container">
						<Icon type="logo-icon" className="head-logo" />
					</div>
					<div className="head-logo-text-container">Consommé</div>
				</div>
				<div className="h-[10px]" />
				<div className="text-box">
					<div className="sub-text-container">Create</div>
				</div>
				<div className="h-[10px]" />
				<SidebarButton logotype="video" text="콘텐츠 소재" />
				<SidebarButton logotype="box" text="소재 보관함" disabled />
			</div>
			<div className="right-content-box">
				<div className="right-content-container">
					<div className="h-[83px]" />
					<div className="header-text-container">
						콘텐츠 영상 소재 생성하기
					</div>
					<div className="h-[43px]" />
					<div className="subheader-text-container">
						관심 있는 키워드
					</div>
					<InputWithLabel label="" placeholder="예시: 탕후루" />
					<div className="h-[23px]" />
					<div className="subheader-text-container">
						콘텐츠 카테고리
					</div>
					<div className="h-[5px]" />
					<div className="category-button-container">
						<RoundButton
							type="disabled"
							text="스포츠"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="뷰티/패션"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="교육"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="엔터테인먼트"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="영화/애니메이션"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="음식"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="게임"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="여행/이벤트"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="가족"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="노하우/스타일"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="음악"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="뉴스/정치"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="비영리/사회운동"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="인물/블로그"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="과학기술"
							onClick={() => router.push('/recommned_page')}
						/>
						<RoundButton
							type="disabled"
							text="기타"
							onClick={() => router.push('/recommned_page')}
						/>
					</div>
					<div className="button-container">
						<RectButton
							type="disabled"
							text="생성하기"
							onClick={() => router.push('/recommned_page')}
						/>
					</div>
				</div>
			</div>
		</main>
	)
}
export default App
