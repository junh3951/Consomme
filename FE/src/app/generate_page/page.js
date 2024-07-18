'use client'

import './page.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/presentation/components/sidebar/sidebar'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'
import RectButton from '@/presentation/components/rect_button/rect_button'

function App() {
	const router = useRouter()
	const [previousPage, setPreviousPage] = useState('')
	const [contents, setContents] = useState([])
	const [selectedContent, setSelectedContent] = useState(null)
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		const prevPage = localStorage.getItem('previousPage')
		if (prevPage) {
			setPreviousPage(prevPage)
		}
		setTimeout(() => {
			localStorage.setItem('previousPage', window.location.href)
		}, 0)

		// JSON 데이터 파싱하여 contents 배열 업데이트
		const generatedContentData = localStorage.getItem(
			'generatedContentData',
		)
		if (generatedContentData) {
			console.log('generatedContentData:', generatedContentData)
			const parsedData = JSON.parse(generatedContentData)
			const today = new Date().toISOString().split('T')[0] // 오늘 날짜

			const newContents = []

			const parseContent = (trendingData) => {
				if (trendingData) {
					const parts = trendingData.split('\n- **소재 추천 이유**:')
					if (parts.length === 2) {
						const title = parts[0]?.replace('### ', '').trim()
						const reason = parts[1]?.trim()
						console.log('Parsed title:', title)
						console.log('Parsed reason:', reason)
						if (title && reason) {
							newContents.push({
								title: title,
								reason: reason,
								date: today,
							})
						}
					}
				}
			}

			parseContent(parsedData.trending_1)
			parseContent(parsedData.trending_2)
			parseContent(parsedData.trending_3)

			setContents(newContents)
			console.log('Updated contents:', newContents)
		}
	}, [])

	useEffect(() => {
		console.log('Previous page:', previousPage)
	}, [previousPage])

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleContentClick = (index) => {
		setSelectedContent(index) // 선택된 컨텐츠의 index를 설정
	}

	const handleButtonClick = () => {
		const contentTitle = contents[selectedContent]?.title
		if (contentTitle) {
			const params = new URLSearchParams({ contentTitle }).toString()
			router.push(`/result_page?${params}`)
		}
	}

	return (
		<main className="recommandpg-flex recommandpg-min-h-screen recommandpg-flex-col recommandpg-items-center recommandpg-justify-center recommandpg-bg-white">
			<Sidebar />
			<div className="generatepg-right-content-box">
				<div className="generatepg-right-content-container">
					<div className="h-[55px]" />
					<button
						className="generatepg-back-button"
						onClick={() => router.push(previousPage)}
					>
						← 콘텐츠 영상 소재 생성하기
					</button>
					<div className="generatepg-subheader-text-container">
						소재 후보 선택
					</div>
					<div className="h-[15px]" />
					<div className="generatepg-content-grid">
						{contents.map((content, index) => (
							<div
								className={`generatepg-content-box ${
									selectedContent === index
										? 'selected'
										: selectedContent !== null
										? 'unselected'
										: ''
								}`}
								key={index}
								onClick={() => handleContentClick(index)}
							>
								<div className="generatepg-content-box-number">
									후보 {index + 1}
								</div>
								<div className="generatepg-content-box-label">
									소재
								</div>
								<div className="generatepg-content-title-text">
									{content.title}
								</div>
								<div className="generatepg-content-box-label">
									소재 추천 이유
								</div>
								<div className="generatepg-content-box-text">
									{content.reason}
								</div>
								<div className="generatepg-date">
									{content.date}
								</div>
							</div>
						))}
					</div>
					<div className="h-[10px]" />
					<div className="generatepg-subheader-text-container">
						디테일
					</div>
					<InputWithLabel
						label=""
						placeholder="ex) 한달살기하면서 인기 있을 생활 콘텐츠 요소도 트렌드에 기반해서 같이 추천해줘."
						type="textarea"
						onChange={handleInputChange}
					/>
					<div className="h-[20px]" />
					<div className="generatepg-last-button-container">
						<div className="generatepg-last-button-container">
							<RectButton
								type="highlight"
								text="이대로 완성하기"
								onClick={handleButtonClick}
							/>
						</div>
						<div className="generatepg-last-button-container">
							<RectButton
								type="default"
								text="다시 생성하기"
								onClick={() => router.push(`/result_page`)}
								disabled={true}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default App
