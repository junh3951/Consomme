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
	const [content, setContent] = useState({
		title: '',
		reason: '',
		date: '',
		references: [],
	})

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
			<ReferenceField references={content.references} />
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

	const saveContentToHistory = () => {
		const content = JSON.parse(localStorage.getItem('selectedContent'))
		let index = 0
		while (localStorage.getItem(`contentHistory${index}`)) {
			index++
		}
		localStorage.setItem(`contentHistory${index}`, JSON.stringify(content))
		console.log(`Saved content to contentHistory${index}:`, content)
	}

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
										onClick={() => {
											saveContentToHistory()
											router.push('/archive_page')
										}}
									/>
								</div>
								<div className="resultpg-button-container2">
									<RectButton
										type="highlight"
										text="완료하기"
										onClick={() => {
											saveContentToHistory()
											router.push('/recommned_page')
										}}
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
