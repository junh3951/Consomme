'use client'

import './page.css'
import React, { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import RectButton from '@/presentation/components/rect_button/rect_button'
import DefinedField from '@/presentation/components/defined_text_field/defined_text_field'
import ReferenceField from '@/presentation/components/reference_field/reference_field'
import Sidebar from '@/presentation/components/sidebar/sidebar'

function DetailContent() {
	const router = useRouter()
	const [previousPage, setPreviousPage] = useState('')
	const [content, setContent] = useState({ title: '', reason: '', date: '' })
	const [references, setReferences] = useState([])

	useEffect(() => {
		const prevPage = localStorage.getItem('previousPage')
		if (prevPage) {
			setPreviousPage(prevPage)
		}
		setTimeout(() => {
			localStorage.setItem('previousPage', window.location.href)
		}, 0)

		const selectedContent = localStorage.getItem('selectedContent')
		if (selectedContent) {
			const parsedContent = JSON.parse(selectedContent)
			setContent(parsedContent)
		}
	}, [])

	useEffect(() => {
		// 유튜브 비디오 정보를 가져오기 위한 로직
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
			setReferences(newReferences)
			console.log('Final references:', newReferences)
		}

		getVideoReferences()
	}, [])

	useEffect(() => {
		console.log('Previous page:', previousPage)
	}, [previousPage])

	return (
		<>
			<div className="h-[55px]" />
			<button
				className="resultpg-back-button"
				onClick={() => router.push(previousPage)}
			>
				← 콘텐츠 영상 소재 생성하기
			</button>
			<div className="resultpg-subheader-text-container">소재 제목</div>
			<div className="resultpg-definedfield-container">
				<DefinedField label="" value={content.title} />
			</div>
			<div className="resultpg-subheader-text-container">참고정보</div>
			<div className="h-[10px]" />
			<ReferenceField references={references} />
			<div className="h-[10px]" />
			<div className="resultpg-subheader-text-container">
				소재 추천 이유
			</div>
			<div className="resultpg-definedfield-container">
				<DefinedField label="" value={content.reason} />
			</div>
			<div className="h-[15px]" />
		</>
	)
}

function DetailPage() {
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

	return (
		<main className="resultpg-flex resultpg-min-h-screen resultpg-flex-col resultpg-items-center resultpg-justify-center resultpg-bg-white">
			<Sidebar />
			<div className="resultpg-right-content-box">
				<div className="resultpg-right-content-container">
					<Suspense fallback={<div>Loading...</div>}>
						<DetailContent />
					</Suspense>
					{previousPage.includes('generate_page') ? (
						<div className="resultpg-button-container-box">
							<div className="resultpg-button-container4">
								<RectButton
									type="default"
									text="이전으로"
									onClick={() => router.push(previousPage)}
								/>
							</div>
							<div className="resultpg-button-container3">
								<div className="resultpg-button-container2">
									<RectButton
										type="default"
										text="보관함으로 이동하기"
										onClick={() =>
											router.push('/archive_page')
										}
									/>
								</div>
								<div className="resultpg-button-container2">
									<RectButton
										type="highlight"
										text="완료하기"
										onClick={() =>
											router.push('/recommned_page')
										}
									/>
								</div>
							</div>
						</div>
					) : (
						<div className="resultpg-button-container">
							<RectButton
								type="default"
								text="보관함으로 돌아가기"
								onClick={() => router.push('/archive_page')}
							/>
						</div>
					)}
				</div>
			</div>
		</main>
	)
}

export default DetailPage
