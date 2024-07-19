'use client'

import './page.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RectButton from '@/presentation/components/rect_button/rect_button'
import RoundButton from '@/presentation/components/round_button/round_button'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'
import Sidebar from '@/presentation/components/sidebar/sidebar'
import BubbleButtons from '@/presentation/components/bubble_buttons/bubble_buttons'
import Loading from '@/presentation/components/loading/loading'
import { Analytics } from '@vercel/analytics/react'

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
	const [trendsByCategory, setTrendsByCategory] = useState({
		스포츠: ['', '', '', '', '', '', '', ''],
		'뷰티 / 패션': ['', '', '', '', '', '', '', ''],
		엔터테인먼트: ['', '', '', '', '', '', '', ''],
		음식: ['', '', '', '', '', '', '', ''],
		게임: ['', '', '', '', '', '', '', ''],
		'여행 / 이벤트': ['', '', '', '', '', '', '', ''],
		'애완동물 / 동물': ['', '', '', '', '', '', '', ''],
	})
	const [inputValue, setInputValue] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [selectedTrend, setSelectedTrend] = useState(null)
	const [isSearching, setIsSearching] = useState(false)
	const [isGenerating, setIsGenerating] = useState(false)
	const router = useRouter()
	const [previousPage, setPreviousPage] = useState('')

	useEffect(() => {
		const prevPage = localStorage.getItem('previousPage')
		if (prevPage) {
			setPreviousPage(prevPage)
		}
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

	const handleCategoryClick = async (category) => {
		setSelectedCategory(category)
		setIsSearching(true)

		const data = {
			search_keyword: inputValue,
			category: category,
		}

		console.log('Sending search request:', data)

		try {
			const searchResponse = await fetch('https://consomme.site/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			console.log('Search response status:', searchResponse.status)
			if (!searchResponse.ok) {
				throw new Error('Search request failed')
			}

			const searchResponseData = await searchResponse.json()
			console.log('Received search response:', searchResponseData)

			localStorage.setItem(
				'searchResponseData',
				JSON.stringify(searchResponseData),
			)

			// video_ids_keyword와 video_ids_category를 localStorage에 저장
			localStorage.setItem(
				'video_ids_keyword',
				JSON.stringify(searchResponseData.video_ids_keyword),
			)
			localStorage.setItem(
				'video_ids_category',
				JSON.stringify(searchResponseData.video_ids_category),
			)
			console.log(
				'video_ids_keyword:',
				searchResponseData.video_ids_keyword,
			)
			console.log(
				'video_ids_category:',
				searchResponseData.video_ids_category,
			)

			const reversedKeywords = searchResponseData.top_keywords_category
				.slice()
				.reverse()

			const updatedTrendsByCategory = {
				...trendsByCategory,
				[category]: reversedKeywords,
			}
			setTrendsByCategory(updatedTrendsByCategory)
		} catch (error) {
			console.error('Error during search request:', error)
			alert('검색 요청 처리 중 오류가 발생했습니다.')
		} finally {
			setIsSearching(false)
		}
	}

	const handleTrendClick = (trend) => {
		setSelectedTrend(trend)
	}

	const handleGenerateClick = async () => {
		setIsGenerating(true)

		const data = {
			search_keyword: inputValue,
			category: selectedCategory,
			chosen_keyword: selectedTrend,
		}

		console.log('Sending generate request:', data)

		try {
			const generateResponse = await fetch(
				'https://consomme.site/generate',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				},
			)

			console.log('Generate response status:', generateResponse.status)
			if (!generateResponse.ok) {
				throw new Error('Generate request failed')
			}

			const generateResponseData = await generateResponse.json()
			console.log('Received generate response:', generateResponseData)
			localStorage.setItem(
				'generatedContentData',
				JSON.stringify(generateResponseData),
			)
			console.log('generatedContentData:', generateResponseData)
		} catch (error) {
			console.error('Error during generate request:', error)
		} finally {
			setIsGenerating(false)
			router.push(`/generate_page?category=${selectedCategory}`)
		}
	}

	return (
		<main className="recommandpg-flex recommandpg-min-h-screen recommandpg-flex-col recommandpg-items-center recommandpg-justify-center recommandpg-bg-white">
			<Sidebar />
			<div className="recommandpg-right-content-box">
				{isGenerating && <Loading />}
				{/* {isGenerating && <div className="loading-overlay" />} */}
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
							disabled={isSearching}
						/>
						<RoundButton
							type={
								selectedCategory === '뷰티 / 패션'
									? 'highlight'
									: 'default'
							}
							text="뷰티 / 패션"
							onClick={() => handleCategoryClick('뷰티 / 패션')}
							disabled={isSearching}
						/>
						<RoundButton
							type={
								selectedCategory === '엔터테인먼트'
									? 'highlight'
									: 'default'
							}
							text="엔터테인먼트"
							onClick={() => handleCategoryClick('엔터테인먼트')}
							disabled={isSearching}
						/>
						<RoundButton
							type={
								selectedCategory === '음식'
									? 'highlight'
									: 'default'
							}
							text="음식"
							onClick={() => handleCategoryClick('음식')}
							disabled={isSearching}
						/>
						<RoundButton
							type={
								selectedCategory === '게임'
									? 'highlight'
									: 'default'
							}
							text="게임"
							onClick={() => handleCategoryClick('게임')}
							disabled={isSearching}
						/>
						<RoundButton
							type={
								selectedCategory === '여행 / 이벤트'
									? 'highlight'
									: 'default'
							}
							text="여행 / 이벤트"
							onClick={() => handleCategoryClick('여행 / 이벤트')}
							disabled={isSearching}
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
							disabled={isSearching}
						/>
					</div>
					<div className="recommandpg-subheader-text-container">
						트렌드 키워드 선택
					</div>
					<div className="recommandpg-subheader-detailtext-container">
						카테고리를 선택하면 최근 N개월 동안 관련 결과 분석
						콘텐트에서 높은 빈도수를 보이는 키워드를 시각화하여
						보여줍니다.
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
						onClick={handleGenerateClick}
						disabled={
							!inputValue || !selectedCategory || !selectedTrend
						}
					/>
				</div>
			</div>
			<Analytics />
		</main>
	)
}
export default App
