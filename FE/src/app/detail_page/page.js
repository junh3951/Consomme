'use client'

import './page.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import RectButton from '@/presentation/components/rect_button/rect_button'
import RoundButton from '@/presentation/components/round_button/round_button'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'
import SidebarButton from '@/presentation/components/sidebar_button/sidebar_button'
import DefinedField from '@/presentation/components/defined_text_field/defined_text_field'

function App() {
	const [inputValue, setInputValue] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('여행/이벤트')
	const [showContent, setShowContent] = useState(false)
	const router = useRouter()

	const getRecommendation = () => {
		if (selectedCategory === '여행/이벤트') {
			return (
				<DefinedField
					label="소재 추천 이유"
					value="짠최근 여행 콘텐츠 중에서도 경제적인 여행에 대한 관심이 높아지고 있습니다. '짠돌이남친이랑 이상한 제주도여행..'이라는 제목의 영상은 경제적인 여행 방법에 대한 관심을 반영합니다. 이를 통해 예산을 최소화하면서도 즐거운 여행 경험을 제공하는 콘텐츠는 많은 이들에게 유용한 정보와 재미를 제공할 수 있습니다. 또한, 이러한 형식의 콘텐츠는 여행지의 숨은 가치를 발견하고, 창의적인 여행 계획을 세우는 데 도움을 줄 수 있으며, 시청자들에게 예산 관리에 대한 영감을 제공"
				/>
			)
		} else if (selectedCategory === '뷰티/패션') {
			return (
				<DefinedField
					label="추천 이유"
					value="여름 대세! 트렌디한 믹스매치 룩북을 소개합니다. 이번 시즌의 여름 패션은 다양한 스타일을 믹스매치하는 것이 핵심입니다. 캐주얼한 데님 쇼츠와 시크한 블레이저를 조합하거나, 스포티한 스니커즈와 여성스러운 원피스를 함께 매치하는 등 창의적이고 다채로운 스타일링을 통해 자신만의 개성을 표현할 수 있습니다. 이 룩북에서는 여름철에 어울리는 다양한 패션 아이템들을 어떻게 믹스매치할 수 있는지 보여주며, 실용적이면서도 트렌디한 스타일링 팁을 제공합니다. 해시태그 #여름패션 #믹스매치 #룩북을 통해 더욱 많은 사람들과 이 패션 트렌드를 공유해보세요."
				/>
			)
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-white">
				<div className="right-content-box fade-in">
					<div className="right-content-container">
						<div className="h-[83px]" />
						<DefinedField
							label="소재 제목"
							value="짠들이 남친과 함께하는 국내 저예산 여행 챌린지"
						/>
						<div className="h-[83px]" />
						<p>참고정보</p>
						{getRecommendation()}
					</div>
				</div>
		</main>
	)
}
export default App
