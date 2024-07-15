'use client'

import './page.css'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function App() {
	const router = useRouter()

	const contents = [//보관된 소재
		{
		  title: '몽골로 단돈 150만원으로 한달살기하기',
		  reason: '현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 \'n만원으로 살아남기\' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다.',
		  date: '2024.07.09'
		},
		{
		  title: '몽골로 단돈 150만원으로 한달살기하기',
		  reason: '현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 \'n만원으로 살아남기\' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다.',
		  date: '2024.07.09'
		},
		{
		  title: '몽골로 단돈 150만원으로 한달살기하기',
		  reason: '현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 \'n만원으로 살아남기\' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다.',
		  date: '2024.07.09'
		},
		{
		  title: '몽골로 단돈 150만원으로 한달살기하기',
		  reason: '현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 \'n만원으로 살아남기\' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다.',
		  date: '2024.07.09'
		},
	  ];

	const numOfContents = contents.length;

	const handleCardClick = (title) => {
		const params = new URLSearchParams({ title }).toString();
		router.push(`/detail_page?${params}`);
	};

	return (
		<div className="right-content-container">
			<div className="h-[83px]" />
			<div className="header-text-container">
				소재 보관함
			</div>
			<div className="h-[23px]" />
			<div className="subheader-text-container">
				생성된 소재 ({numOfContents})
			</div>
			<div className="h-[23px]" />
			<div className="content-grid">
				{contents.map((content, index) => (
					<div className="content-box" key={index} onClick={() => handleCardClick(content.title)}>              
						<div className="content-box-label">소재</div>
						<div className="content-title-text">{content.title}</div>
						<div className="content-box-label">소재 추천 이유</div>
						<div className="content-box-text">{content.reason}</div>
						<div className="date">{content.date}</div>
					</div>
				))}
			</div>
		</div>
	)
}
export default App
