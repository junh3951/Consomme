'use client'

import './page.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/presentation/components/sidebar/sidebar'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'
import RectButton from '@/presentation/components/rect_button/rect_button'
import Loading from '@/presentation/components/loading/loading'

function App() {
	const router = useRouter()
	const [previousPage, setPreviousPage] = useState('')
	const [contents, setContents] = useState([])
	const [selectedContent, setSelectedContent] = useState(null)
	const [inputValue, setInputValue] = useState('')
	const [detailValue, setDetailValue] = useState('')
	const [isRegenerating, setIsRegenerating] = useState(false);

	useEffect(() => {
		const prevPage = localStorage.getItem('previousPage')
		if (prevPage) {
			setPreviousPage(prevPage)
		}
		setTimeout(() => {
			localStorage.setItem('previousPage', window.location.href)
		}, 0)

		const generatedContentData = localStorage.getItem(
			'generatedContentData',
		)
		if (generatedContentData) {
			console.log('generatedContentData:', generatedContentData)
			const parsedData = JSON.parse(generatedContentData)
			const today = new Date().toISOString().split('T')[0]

			const newContents = []

			const parseContent = (trendingData) => {
				if (trendingData) {
					const parts = trendingData.split('**소재 추천 이유:**')
					if (parts.length === 2) {
						let titlePart = parts[0]?.replace('### ', '').trim()
						const reason = parts[1]?.trim()

						// **소재:** 뒤부터 제목으로 설정
						const titleIndex = titlePart.indexOf('**소재:**')
						let title = titlePart
						if (titleIndex !== -1) {
							title = titlePart.substring(titleIndex + 8).trim()
						}

						console.log('Parsed title:', title)
						console.log('Parsed reason:', reason)
						if (title && reason) {
							newContents.push({
								title: title,
								reason: reason,
								date: today,
								references: [],
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

	const handleDetailChange = (e) => {
		setDetailValue(e.target.value)
	}

	const handleContentClick = (index) => {
		setSelectedContent(index)
		const selectedContent = contents[index]
		localStorage.setItem('selectedContent', JSON.stringify(selectedContent))
		console.log('Selected content saved to localStorage:', selectedContent)
	}

	const handleButtonClick = () => {
		if (selectedContent !== null) {
			const selectedContentData = contents[selectedContent]

			// Fetch references
			const videoIdsKeyword = JSON.parse(
				localStorage.getItem('video_ids_keyword') || '[]',
			)
			const videoIdsCategory = JSON.parse(
				localStorage.getItem('video_ids_category') || '[]',
			)
			const allVideoIds = [...videoIdsKeyword, ...videoIdsCategory]
			console.log('All video ids:', allVideoIds)

			const shuffled = allVideoIds.sort(() => 0.5 - Math.random())
			console.log('Shuffled video ids:', shuffled)

			const fetchVideoDetails = async (videoId) => {
				const response = await fetch(
					`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
				)
				if (!response.ok) {
					throw new Error('Failed to fetch video details')
				}
				const data = await response.json()
				return data.items[0].snippet
			}

			const getVideoReferences = async () => {
				const newReferences = []
				for (const videoId of shuffled) {
					if (newReferences.length >= 3) break
					try {
						const videoDetails = await fetchVideoDetails(videoId)
						newReferences.push({
							link: `https://www.youtube.com/watch?v=${videoId}`,
							title: videoDetails.title,
							channel: videoDetails.channelTitle,
						})
					} catch (error) {
						console.error('Error fetching video details:', error)
					}
				}
				return newReferences
			}

			getVideoReferences().then((references) => {
				selectedContentData.references = references
				localStorage.setItem(
					'selectedContent',
					JSON.stringify(selectedContentData),
				)
				console.log(
					'Selected content with references saved to localStorage:',
					selectedContentData,
				)
				router.push(`/result_page?title=${selectedContentData.title}`)
			})
		}
	}

	const handleRegenerateClick = async () => {
		if (selectedContent === null || !detailValue) return

		setIsRegenerating(true)

		const selectedTrending = contents[selectedContent]
		const requestData = {
			selected_trending: `### ${selectedTrending.title}\n**소재 추천 이유:**\n${selectedTrending.reason}`,
			enhancement_instruction: detailValue,
		}

		console.log('Sending enhancement request:', requestData)

		try {
			const response = await fetch('http://34.16.144.210:3000/enhance', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			})

			console.log('Enhance response status:', response.status)
			if (!response.ok) {
				throw new Error('Enhance request failed')
			}

			const responseData = await response.json()
			console.log('Received enhance response:', responseData)

			const enhancedContent = {
				...selectedTrending,
				title: responseData.enhanced_recommendation
					.split('\n')[0]
					.replace('###', '')
					.split(':')[1]
					.trim(),
				reason: responseData.enhanced_recommendation
					.split('**소재 추천 이유:**')[1]
					.trim(),
				date: new Date().toISOString().split('T')[0],
				references: selectedTrending.references,
			}

			const newContents = [...contents]
			newContents[selectedContent] = enhancedContent
			setContents(newContents)

			localStorage.setItem(
				'selectedContent',
				JSON.stringify(enhancedContent),
			)
			console.log(
				'Enhanced content saved to localStorage:',
				enhancedContent,
			)
		} catch (error) {
			console.error('Error during enhance request:', error)
		} finally {
			setIsRegenerating(false)
		}
	}

	return (
		<main className="recommandpg-flex recommandpg-min-h-screen recommandpg-flex-col recommandpg-items-center recommandpg-justify-center recommandpg-bg-white">
			<Sidebar activePage="recommned_page" />
			<div className="generatepg-right-content-box">
				{isRegenerating && <Loading />}
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
						onChange={handleDetailChange}
					/>
					<div className="h-[20px]" />
					<div className="generatepg-last-button-container">
						<div className="generatepg-last-button">
							<RectButton
								type="highlight"
								text="이대로 완성하기"
								onClick={handleButtonClick}
							/>
						</div>
						<div className="generatepg-last-button">
							<RectButton
								type="default"
								text="다시 생성하기"
								onClick={handleRegenerateClick}
								disabled={
									selectedContent === null || !detailValue
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default App
