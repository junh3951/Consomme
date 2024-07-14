'use client'

import './page.css'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import RectButton from '@/presentation/components/rect_button/rect_button'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'

export default function Home() {
	const router = useRouter()
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-white">
			<div className="left-sidebar">
				<div className="logo-ribbon-container">
					<Icon type="logo-ribbon" className="sidebar-pattern" />
				</div>
				<div className="greeting-text">
					10초 내로 다양한 콘텐츠 소재를 <br />
					트렌드에 기반하여 생성해주는 <br />
					<strong>Consommé</strong>
				</div>
			</div>
			<div className="right-content-box">
				<div className="right-content-container">
					<div className="logo-container">
						<Icon type="logo-icon" />
					</div>
					<div className="text-container">Welcome to Consommé</div>
					<div className="h-[10px]" />
					<InputWithLabel label="Email" placeholder="Email" />
					<InputWithLabel
						label="Password"
						placeholder="Password"
						type="password"
					/>
					<div className="forgot-password-text">비밀번호를 까먹었나요?</div>
					<div className="h-[30px]" />
					<div className="button-container">
						<RectButton
							type="highlight"
							text="로그인"
							onClick={() => router.push('/recommned_page')}
						/>
					</div>
					<div className="h-[10px]" />
					<div className="button-container">
						<RectButton
							type="default"
							text="회원가입"
							onClick={() => router.push('/signup_page')}
						/>
					</div>
					<div className="h-[10px]" />
					<div className="or-text">or</div>
					<div className="h-[10px]" />
					<div className="button-container">
						<RectButton
							type="default"
							text="구글 계정으로 가입"
							// onClick={() => router.push('/signup_page')}
						/>
					</div>
				</div>
			</div>
		</main>
	)
}
