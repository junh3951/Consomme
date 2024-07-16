'use client'

import './page.css'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import RectButton from '@/presentation/components/rect_button/rect_button'
import RoundButton from '@/presentation/components/round_button/round_button'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'
import SidebarButton from '@/presentation/components/sidebar_button/sidebar_button'

const getCircleSize = (index) => {
	const baseSize = 50; // 기본 크기
	const sizeIncrement = 10; // 증가 크기
	return baseSize + index * sizeIncrement;
};	

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
];

function KeywordCircles({ keywords }) {
	return (
		<div className="keyword-circles">
			{keywords.map((keyword, index) => (
				<div
					key={index}
					className="keyword-circle"
					style={{ width: keyword.size, height: keyword.size }}
				>
					{keyword.text}
				</div>
			))}
		</div>
	);
}

function App() {
	const trendsByCategory = {
		"스포츠": ["축구", "야구", "농구", "테니스", "배드민턴", "골프", "수영", "복싱"],
		"뷰티 / 패션": ["스킨케어", "메이크업", "헤어스타일", "패션 트렌드", "액세서리", "네일 아트", "향수", "바디케어"],
		"엔터테인먼트": ["1", "2", "3", "4", "5", "6", "7", "8"],
		"음식": ["1", "2", "3", "4", "5", "6", "7", "8"],
		"게임": ["1", "2", "3", "4", "5", "6", "7", "8"],
		"여행 / 이벤트": ["1", "2", "3", "4", "5", "6", "7", "8"],
		"애완동물 / 동물": ["1", "2", "3", "4", "5", "6", "7", "8"]
	};
	const [inputValue, setInputValue] = useState('')
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [selectedTrend, setSelectedTrend] = useState(null)
	const router = useRouter()

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleCategoryClick = (category) => {
		setSelectedCategory(category)
	}
	

	const handleTrendClick = (trend) => {
		setSelectedTrend(trend)
	}

	return (
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
						placeholder="한 단어로 입력해주세요."
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
								selectedCategory === '뷰티 / 패션'
									? 'highlight'
									: 'default'
							}
							text="뷰티 / 패션"
							onClick={() => handleCategoryClick('뷰티 / 패션')}
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
								selectedCategory === '여행 / 이벤트'
									? 'highlight'
									: 'default'
							}
							text="여행 / 이벤트"
							onClick={() => handleCategoryClick('여행 / 이벤트')}
						/>

						<RoundButton
							type={
								selectedCategory === '애완동물 / 동물'
									? 'highlight'
									: 'default'
							}
							text="애완동물 / 동물"
							onClick={() => handleCategoryClick('애완동물 / 동물')}
						/>
					</div>
					<div className="subheader-text-container">
						트렌드 키워드 선택
					</div>
					<p>선택하신 카테고리 내 최근 N개월 동안 관련 결과 분석 콘텐트에서 높은 빈도수를 보이는 키워드를 시각화하여 보여준 그래프입니다.</p>
					<div className="h-[50px]" />
					{selectedCategory && (
						<div className="circle-container">
							{trendsByCategory[selectedCategory].map((trend, index) => (
								<button
									key={index}
									className={`circle circle-${index + 1} ${selectedTrend === trend ? 'highlight' : ''}`}
									onClick={() => handleTrendClick(trend)}
								>
									{trend}
								</button>
							))}
						</div>
					)}
					<div className="h-[50px]" />

					
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
	)
}
export default App
