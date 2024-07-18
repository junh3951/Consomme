'use client'

import './page.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import RectButton from '@/presentation/components/rect_button/rect_button'
import RoundButton from '@/presentation/components/round_button/round_button'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'
import SidebarButton from '@/presentation/components/sidebar_button/sidebar_button'
import Sidebar from '@/presentation/components/sidebar/sidebar'
import BubbleButtons from '@/presentation/components/bubble_buttons/bubble_buttons'

const getCircleSize = (index) => {
	const baseSize = 50 // 기본 크기
	const sizeIncrement = 10 // 증가 크기
	return baseSize + index * sizeIncrement
}

const keywords = [
	{ text: '한달살기', size: getCircleSize(0) },
	{ text: '탕후루', size: getCircleSize(1) },
	{ text: '퇴사 후 여행', size: getCircleSize(2) },
	{ text: '치앙마이', size: getCircleSize(3) },
	{ text: '랜덤뽑기', size: getCircleSize(4) },
	{ text: '살아남기', size: getCircleSize(5) },
	{ text: '아프리카', size: getCircleSize(6) },
	{ text: '에어비앤비', size: getCircleSize(7) },
	// 추가 키워드들
]

function App() {
	const trendsByCategory = {
		스포츠: [
			'축구',
			'야구',
			'농구',
			'테니스',
			'배드민턴',
			'골프',
			'수영',
			'복싱',
		],
		'뷰티 / 패션': [
			'스킨케어',
			'메이크업',
			'헤어스타일',
			'패션 트렌드',
			'액세서리',
			'네일 아트',
			'향수',
			'바디케어',
		],
		엔터테인먼트: ['1', '2', '3', '4', '5', '6', '7', '8'],
		음식: ['1', '2', '3', '4', '5', '6', '7', '8'],
		게임: ['1', '2', '3', '4', '5', '6', '7', '8'],
		'여행 / 이벤트': ['1', '2', '3', '4', '5', '6', '7', '8'],
		'애완동물 / 동물': ['1', '2', '3', '4', '5', '6', '7', '8'],
	}
	const [inputValue, setInputValue] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [selectedTrend, setSelectedTrend] = useState(null)
	const router = useRouter()
	const [previousPage, setPreviousPage] = useState('')

	useEffect(() => {
		const prevPage = localStorage.getItem('previousPage')
		if (prevPage) {
			setPreviousPage(prevPage)
		}
		// localStorage에 현재 페이지를 저장하는 작업을 나중에 수행
		setTimeout(() => {
			localStorage.setItem('previousPage', window.location.href)
		}, 0)
	}, [])

	useEffect(() => {
		console.log('Previous page:', previousPage)
	}, [previousPage])
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
		<main className="recommandpg-flex recommandpg-min-h-screen recommandpg-flex-col recommandpg-items-center recommandpg-justify-center recommandpg-bg-white">
			<Sidebar />
			<div className="recommandpg-right-content-box">
				<div className="recommandpg-right-content-container">
					<div className="h-[55px]" />
					<div className="recommandpg-header-text-container">
						콘텐츠 영상 소재 생성하기
					</div>
					<div className="h-[13px]" />
					<div className="recommandpg-subheader-text-container">
						관심 있는 키워드
					</div>
					<InputWithLabel
						label=""
						placeholder="한 단어로 입력해주세요."
						onChange={handleInputChange}
					/>
					<div className="h-[23px]" />
					<div className="recommandpg-subheader-text-container">
						콘텐츠 카테고리
					</div>
					<div className="h-[5px]" />
					<div className="recommandpg-category-button-container">
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
								selectedCategory === '뷰티 / 패션'
									? 'highlight'
									: 'default'
							}
							text="뷰티 / 패션"
							onClick={() => handleCategoryClick('뷰티 / 패션')}
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
							onClick={() => handleCategoryClick('게임')}
						/>
						<RoundButton
							type={
								selectedCategory === '여행 / 이벤트'
									? 'highlight'
									: 'default'
							}
							text="여행 / 이벤트"
							onClick={() => handleCategoryClick('여행 / 이벤트')}
						/>
						<RoundButton
							type={
								selectedCategory === '애완동물 / 동물'
									? 'highlight'
									: 'default'
							}
							text="애완동물 / 동물"
							onClick={() =>
								handleCategoryClick('애완동물 / 동물')
							}
						/>
					</div>
					<div className="recommandpg-subheader-text-container">
						트렌드 키워드 선택
					</div>
					<div className="recommandpg-subheader-detailtext-container">
						선택하신 카테고리 내 최근 N개월 동안 관련 결과 분석
						콘텐트에서 높은 빈도수를 보이는 키워드를 시각화하여
						보여준 그래프입니다.
					</div>
					<div className="h-[10px]" />
					<div className="recommandpg-bubble-button-container">
						{selectedCategory && (
							<BubbleButtons
								trends={trendsByCategory[selectedCategory]}
								selectedTrend={selectedTrend}
								onTrendClick={handleTrendClick}
							/>
						)}
					</div>

					<div className="h-[25px]" />

					<RectButton
						type="highlight"
						text="생성하기"
						onClick={() =>
							router.push(
								`/generate_page?category=${selectedCategory}`,
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
