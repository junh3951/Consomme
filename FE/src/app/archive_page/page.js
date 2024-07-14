'use client'

import './page.css'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import RectButton from '@/presentation/components/rect_button/rect_button'
import RoundButton from '@/presentation/components/round_button/round_button'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'
import SidebarButton from '@/presentation/components/sidebar_button/sidebar_button'

function App() {
	const [inputValue, setInputValue] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(null)
	const router = useRouter()

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleCategoryClick = (category) => {
		setSelectedCategory(category)
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-white">
			<div className="left-sidebar">
				<div className="h-[90px]" />
				<div className="head-logo-box">
					<div className="head-logo-container">
						<Icon type="logo-icon" className="head-logo" />
					</div>
					<div className="head-logo-text-container">Consommé</div>
				</div>
				<div className="h-[10px]" />
				<div className="text-box">
					<div className="sub-text-container">Create</div>
				</div>
				<div className="h-[10px]" />
				<SidebarButton logotype="video" text="콘텐츠 소재" notactive={true} onClick={() => router.push('/recommned_page')}/>
				<SidebarButton logotype="box" text="소재 보관함" notactive={false} onClick={() => router.push('/archive_page')} />
			</div>
			<div className="right-content-box">
				<div className="right-content-container">
					<div className="h-[83px]" />
					<div className="header-text-container">
						콘텐츠 영상 소재 생성하기
					</div>
					<div className="h-[43px]" />
					<div className="subheader-text-container">
						관심 있는 키워드
					</div>
					<InputWithLabel
						label=""
						placeholder="예시: 탕후루"
						onChange={handleInputChange}
					/>
					<div className="h-[23px]" />
					<div className="subheader-text-container">
						콘텐츠 카테고리
					</div>
					<div className="h-[5px]" />
					<div className="category-button-container">
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
								selectedCategory === '뷰티/패션'
									? 'highlight'
									: 'default'
							}
							text="뷰티/패션"
							onClick={() => handleCategoryClick('뷰티/패션')}
						/>
						<RoundButton
							type={
								selectedCategory === '교육'
									? 'highlight'
									: 'default'
							}
							text="교육"
							onClick={() => handleCategoryClick('교육')}
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
								selectedCategory === '영화/애니메이션'
									? 'highlight'
									: 'default'
							}
							text="영화/애니메이션"
							onClick={() =>
								handleCategoryClick('영화/애니메이션')
							}
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
								selectedCategory === '여행/이벤트'
									? 'highlight'
									: 'default'
							}
							text="여행/이벤트"
							onClick={() => handleCategoryClick('여행/이벤트')}
						/>
						<RoundButton
							type={
								selectedCategory === '가족'
									? 'highlight'
									: 'default'
							}
							text="가족"
							onClick={() => handleCategoryClick('가족')}
						/>
						<RoundButton
							type={
								selectedCategory === '노하우/스타일'
									? 'highlight'
									: 'default'
							}
							text="노하우/스타일"
							onClick={() => handleCategoryClick('노하우/스타일')}
						/>
						<RoundButton
							type={
								selectedCategory === '음악'
									? 'highlight'
									: 'default'
							}
							text="음악"
							onClick={() => handleCategoryClick('음악')}
						/>
						<RoundButton
							type={
								selectedCategory === '뉴스/정치'
									? 'highlight'
									: 'default'
							}
							text="뉴스/정치"
							onClick={() => handleCategoryClick('뉴스/정치')}
						/>
						<RoundButton
							type={
								selectedCategory === '비영리/사회운동'
									? 'highlight'
									: 'default'
							}
							text="비영리/사회운동"
							onClick={() =>
								handleCategoryClick('비영리/사회운동')
							}
						/>
						<RoundButton
							type={
								selectedCategory === '인물/블로그'
									? 'highlight'
									: 'default'
							}
							text="인물/블로그"
							onClick={() => handleCategoryClick('인물/블로그')}
						/>
						<RoundButton
							type={
								selectedCategory === '과학기술'
									? 'highlight'
									: 'default'
							}
							text="과학기술"
							onClick={() => handleCategoryClick('과학기술')}
						/>
						<RoundButton
							type={
								selectedCategory === '기타'
									? 'highlight'
									: 'default'
							}
							text="기타"
							onClick={() => handleCategoryClick('기타')}
						/>
					</div>
					<div className="h-[25px]" />
					<RectButton
						type="highlight"
						text="생성하기"
						onClick={() =>
							router.push(
								`/result_page?category=${selectedCategory}`,
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
