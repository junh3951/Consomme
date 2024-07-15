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
	const [inputValue, setInputValue] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [selectedTrend, setSelectedTrend] = useState(null)
	const router = useRouter()

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleCategoryClick = (category) => {
		setSelectedCategory(category)
	}

	const handleTrendClick = (trend) => {
		setSelectedTrend(trend)
	}

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
					<InputWithLabel
						label=""
						placeholder="예시: 탕후루"
						onChange={handleInputChange}
					/>
					<div className="h-[23px]" />
					<div className="subheader-text-container">
						콘텐츠 카테고리
					</div>
					<div className="h-[5px]" />
					<div className="category-button-container">
						<RoundButton
							type={
								selectedCategory === '스포츠'
									? 'highlight'
									: 'default'
							}
							text="스포츠"
							onClick={() => handleCategoryClick('스포츠')}
						/>
						<RoundButton
							type={
								selectedCategory === '뷰티/패션'
									? 'highlight'
									: 'default'
							}
							text="뷰티/패션"
							onClick={() => handleCategoryClick('뷰티/패션')}
						/>
						<RoundButton
							type={
								selectedCategory === '엔터테인먼트'
									? 'highlight'
									: 'default'
							}
							text="엔터테인먼트"
							onClick={() => handleCategoryClick('엔터테인먼트')}
						/>
						<RoundButton
							type={
								selectedCategory === '음식'
									? 'highlight'
									: 'default'
							}
							text="음식"
							onClick={() => handleCategoryClick('음식')}
						/>
						<RoundButton
							type={
								selectedCategory === '게임'
									? 'highlight'
									: 'default'
							}
							text="게임"
							onClick={() =>
								handleCategoryClick('게임')
							}
						/>
						<RoundButton
							type={
								selectedCategory === '여행/이벤트'
									? 'highlight'
									: 'default'
							}
							text="여행/이벤트"
							onClick={() => handleCategoryClick('여행/이벤트')}
						/>
						<RoundButton
							type={
								selectedCategory === '애완동물/동물'
									? 'highlight'
									: 'default'
							}
							text="애완동물/동물"
							onClick={() => handleCategoryClick('애완동물/동물')}
						/>
					</div>
					<div className="h-[23px]" />
					<div className="subheader-text-container">
						트렌드 키워드 선택
					</div>
					<div className="sub-subheader-text-container">
						선택하신 카테고리 내 최근 N개월 동안 관련 결과 분석 콘텐트에서 높은 빈도수를 보이는 키워드를 시각화하여 보여준 그래프입니다.
					</div>
					<div className="h-[25px]" />
					<div className="trend-button-container">
						<button className='trendButton1'/>
						
					</div>
					<RectButton
						className='generate_button'
						type="highlight"
						text="생성하기"
						onClick={() =>
							router.push(
								`/result_page?category=${selectedCategory}`,
							)
						}
						disabled={!selectedCategory}
					/>
				</div>
			</div>
		</main>
	)
}
export default App
