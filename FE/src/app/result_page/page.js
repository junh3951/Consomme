'use client'

import './page.css'
import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import RectButton from '@/presentation/components/rect_button/rect_button'
import DefinedField from '@/presentation/components/defined_text_field/defined_text_field'
import ReferenceField from '@/presentation/components/reference_field/reference_field'
import Sidebar from '@/presentation/components/sidebar/sidebar'

function DetailContent() {
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
	const searchParams = useSearchParams()
	const title = searchParams.get('title') || '기본 제목'

	const references = [
		//유튜브 링크 일단 const로 작성했어요
		{
			link: 'https://www.youtube.com/watch?v=bBVMnsp_qzQ',
			title: '중앙아시아 유목민 천막 가보기',
			channel: '빠니보틀',
		},
		{
			link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			title: '크로아티아 스탬으로 살아남기',
			channel: '슈리링',
		},
		{
			link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			title: '태국에서 하루 2만원으로 살아남기',
			channel: '쏘이 유튜브',
		},
	]

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
				<DefinedField label="" value={title} />
			</div>
			<div className="resultpg-subheader-text-container">참고정보</div>
			<div className="h-[10px]" />
			<ReferenceField references={references} />
			<div className="h-[10px]" />
			<div className="resultpg-subheader-text-container">
				소재 추천 이유
			</div>
			<div className="resultpg-definedfield-container">
				<DefinedField
					label=""
					value="최근 여행 콘텐츠 중에서도 경제적인 여행에 대한 관심이 높아지고 있습니다. '짠돌이남친이랑 이상한 제주도여행..'이라는 제목의 영상은 경제적인 여행 방법에 대한 관심을 반영합니다. 이를 통해 예산을 최소화하면서도 즐거운 여행 경험을 제공하는 콘텐츠는 많은 이들에게 유용한 정보와 재미를 제공할 수 있습니다. 또한, 이러한 형식의 콘텐츠는 여행지의 숨은 가치를 발견하고, 창의적인 여행 계획을 세우는 데 도움을 줄 수 있으며, 시청자들에게 예산 관리에 대한 영감을 제공"
				/>
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
		// localStorage에 현재 페이지를 저장하는 작업을 나중에 수행
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
