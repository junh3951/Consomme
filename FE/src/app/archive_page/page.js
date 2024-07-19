'use client'

import './page.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/presentation/components/sidebar/sidebar'

function App() {
	const router = useRouter()
	const [previousPage, setPreviousPage] = useState('')
	const [contents, setContents] = useState([])

	useEffect(() => {
		const prevPage = localStorage.getItem('previousPage')
		if (prevPage) {
			setPreviousPage(prevPage)
		}
		// localStorage에 현재 페이지를 저장하는 작업을 나중에 수행
		setTimeout(() => {
			localStorage.setItem('previousPage', window.location.href)
		}, 0)

		// Load content history from localStorage
		const loadedContents = []
		let index = 0
		let content
		while ((content = localStorage.getItem(`contentHistory${index}`))) {
			loadedContents.push(JSON.parse(content))
			index++
		}
		setContents(loadedContents)
	}, [])

	useEffect(() => {
		console.log('Previous page:', previousPage)
	}, [previousPage])

	const numOfContents = contents.length

	const handleCardClick = (content) => {
		localStorage.setItem('selectedContent', JSON.stringify(content))
		router.push(`/result_page`)
	}

	return (
		<main className="recommandpg-flex recommandpg-min-h-screen recommandpg-flex-col recommandpg-items-center recommandpg-justify-center recommandpg-bg-white">
			<Sidebar />
			<div className="archivepg-right-content-box">
				<div className="archivepg-right-content-container">
					<div className="h-[55px]" />
					<div className="archivepg-header-text-container">
						소재 보관함
					</div>
					<div className="h-[23px]" />
					<div className="archivepg-subheader-text-container">
						생성된 소재 ({numOfContents})
					</div>
					<div className="h-[23px]" />
					<div className="archivepg-content-grid-wrapper">
						<div className="archivepg-content-grid">
							{contents.map((content, index) => (
								<div
									className="archivepg-content-box"
									key={index}
									onClick={() => handleCardClick(content)}
								>
									<div className="archivepg-content-box-label">
										소재
									</div>
									<div className="archivepg-content-title-text">
										{content.title}
									</div>
									<div className="archivepg-content-box-label">
										소재 추천 이유
									</div>
									<div className="archivepg-content-box-text">
										{content.reason}
									</div>
									<div className="archivepg-date">
										{content.date}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default App
