'use client'

import './page.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/presentation/components/sidebar/sidebar'

function App() {
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

	const contents = [
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
		{
			title: '몽골로 단돈 150만원으로 한달살기하기',
			reason: "현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 'n만원으로 살아남기' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다.",
			date: '2024.07.09',
		},
	]

	const numOfContents = contents.length

	const handleCardClick = (title) => {
		const params = new URLSearchParams({ title }).toString()
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
									onClick={() =>
										handleCardClick(content.title)
									}
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
