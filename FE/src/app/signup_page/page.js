'use client'

import './page.css'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/presentation/assets/image/icon'
import RectButton from '@/presentation/components/rect_button/rect_button'
import InputWithLabel from '@/presentation/components/input_with_label/input_with_label'

export default function SignUp() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordAgain, setPasswordAgain] = useState('')
	const [name, setName] = useState('')

	const handleSignUp = () => {
		if (password !== passwordAgain) {
			alert('비밀번호가 일치하지 않습니다.')
			return
		}

		const existingUser = JSON.parse(localStorage.getItem(email))
		if (existingUser) {
			alert('이미 사용 중인 이메일입니다.')
			return
		}

		const user = { email, password, name }
		localStorage.setItem(email, JSON.stringify(user))
		alert('회원가입이 완료되었습니다.')
		router.push('/')
	}

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
					<div className="text-container">회원가입</div>
					<div className="h-[10px]" />
					<InputWithLabel
						label="Email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<InputWithLabel
						label="Password"
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputWithLabel
						label="Password Again*"
						placeholder="Password"
						type="password"
						value={passwordAgain}
						onChange={(e) => setPasswordAgain(e.target.value)}
					/>
					<div className="h-[30px]" />
					<InputWithLabel
						label="Name"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<div className="h-[10px]" />
					<div className="button-container">
						<RectButton
							type="highlight"
							text="회원가입"
							onClick={handleSignUp}
						/>
					</div>
				</div>
			</div>
		</main>
	)
}
