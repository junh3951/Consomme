'use client'

import './page.css'
import React, { useState, useEffect } from 'react'
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
	const [username, setUsername] = useState('')

	useEffect(() => {
		const storedEmail = localStorage.getItem('currentUserEmail')
		if (storedEmail) {
			const user = JSON.parse(localStorage.getItem(storedEmail))
			if (user) {
				setUsername(user.name)
			}
		}
	}, [])

	const handleSignUp = () => {
		if (!email || !password || !passwordAgain || !name) {
			alert('모든 필드를 입력하세요.')
			return
		}

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
		localStorage.setItem('currentUserEmail', email) // 현재 사용자를 저장
		alert('회원가입이 완료되었습니다.')
		router.push('/')
	}

	return (
		<main className="signup-flex signup-min-h-screen signup-flex-col signup-items-center signup-justify-center signup-bg-white">
			<div className="signup-left-sidebar">
				<div className="signup-logo-ribbon-container">
					<Icon
						type="logo-ribbon"
						className="signup-sidebar-pattern"
					/>
				</div>
				<div className="signup-greeting-text">
					10초 내로 다양한 콘텐츠 소재를 <br />
					트렌드에 기반하여 생성해주는 <br />
					<strong>Consommé</strong>
				</div>
			</div>
			<div className="signup-right-content-box">
				<div className="signup-right-content-container">
					<div className="signup-logo-container">
						<Icon type="logo-icon" />
					</div>
					<div className="signup-text-container">
						Welcome to Consommé
					</div>
					<div className="h-[10px]" />
					<div className="signup-input-container">
						<InputWithLabel
							label="Email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="signup-input-container">
						<InputWithLabel
							label="Password"
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="signup-input-container">
						<InputWithLabel
							label="Password Again*"
							placeholder="Password"
							type="password"
							value={passwordAgain}
							onChange={(e) => setPasswordAgain(e.target.value)}
						/>
					</div>
					<div className="h-[30px]" />
					<div className="signup-input-container">
						<InputWithLabel
							label="Name"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="h-[10px]" />
					<div className="signup-button-container">
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
