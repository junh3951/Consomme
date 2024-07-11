'use client'

import './page.css'
import React, { useState } from 'react'
import RectButton from '@/presentation/components/rect_button/rect_button'
import Icon from '@/presentation/assets/image/icon'

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-white">
			<div className="left-sidebar">
				<Icon type="logo-ribbon" className="sidebar-pattern" />
			</div>
		</main>
	)
}
