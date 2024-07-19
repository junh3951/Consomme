'use client'

import { useEffect, useState } from 'react'

// Define the Device enum
const Device = {
	mobile: 1,
	desktop: 2,
}

// Custom hook to handle responsiveness
export const useResponsive = () => {
	const breakingPoints = {
		mobile: 393,
		tablet: 708, // 748이 맥북14인치 절반너비
	}

	const [width, setWidth] = useState(
		typeof window !== 'undefined'
			? window.innerWidth
			: breakingPoints.mobile,
	)
	const [responsive, setResponsive] = useState(Device.desktop)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				setWidth(window.innerWidth)
			}

			handleResize()

			window.addEventListener('resize', handleResize)

			return () => {
				window.removeEventListener('resize', handleResize)
			}
		}
	}, [])

	useEffect(() => {
		if (width !== undefined) {
			if (width <= breakingPoints.tablet) {
				setResponsive(Device.mobile)
			} else {
				setResponsive(Device.desktop)
			}
		}
	}, [width])

	return { width, responsive }
}
