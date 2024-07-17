'use client'

import './page.css'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function App() {
	const router = useRouter()
	const [selectedContent, setSelectedContent] = useState(null)

	const contents = [
		//보관된 소재
		{
			title: '몽골로 단돈 150만원으로 한달살기하기',
			reason: "현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 'n만원으로 살아남기' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다.",
			date: '2024.07.09',
		},
		{
			title: '몽골로 단돈 150만원으로 한달살기하기',
			reason: "현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 'n만원으로 살아남기' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다.",
			date: '2024.07.09',
		},
		{
			title: '몽골로 단돈 150만원으로 한달살기하기',
			reason: "현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 'n만원으로 살아남기' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다.",
			date: '2024.07.09',
		},
	]

	const [selectedContentTitle, setSelectedContentTitle] = useState('')

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleContentClick = (index) => {
		setSelectedContent(index) // 선택된 컨텐츠의 index를 설정
	}

	const handleButtonClick = (title) => {
		const contentTitle = contents[selectedContent].title
		const params = new URLSearchParams({ contentTitle }).toString()
		router.push(`/result_page?${params}`)
	}

	const numOfContents = contents.length

	return (
		<div className="generatepg-right-content-box">
			<div className="generatepg-right-content-container">
				<div className="h-[83px]" />
				<button
					className="generatepg-back-button"
					onClick={() => router.push(`/recommned_page`)}
				>
					← 콘텐츠 영상 소재 생성하기
				</button>
				<div className="h-[23px]" />
				<div className="generatepg-subheader-text-container">
					소재 후보 선택
				</div>
				<div className="h-[23px]" />
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
				<div className="h-[50px]" />
				<div className="generatepg-subheader-text-container">
					디테일
				</div>
				<div className="generatepg-input-container">
					<input
						className="generatepg-input-field"
						placeholder={
							'ex) 한달살기하면서 인기 있을 생활 콘텐츠 요소도 트렌드에 기반해서 같이 추천해줘.'
						}
						onChange={handleInputChange}
					/>
				</div>
				<div className="h-[250px]" />
				<div className="generatepg-last-button-container">
					<button
						className="generatepg-last-button"
						onClick={handleButtonClick}
					>
						이대로 완성하기
					</button>
					<button className="generatepg-last-button">
						다시 생성하기
					</button>
				</div>
			</div>
		</div>
	)
}
export default App
