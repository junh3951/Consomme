// 'use client'

// import React from 'react'
// import { useResponsive } from '@/presentation/hooks/useResponsive'
// import Mobile from './mobile'
// import Desktop from './desktop'
// import ReduxProvider from '@/presentation/states/store'

// // Define the Device enum
// const Device = {
// 	mobile: 1,
// 	desktop: 2,
// }

// export default function Home() {
// 	const responsive = useResponsive()

// 	switch (responsive.responsive) {
// 		case Device.mobile:
// 			return (
// 				<ReduxProvider>
// 					<Mobile />
// 				</ReduxProvider>
// 			)
// 		default:
// 			return (
// 				<ReduxProvider>
// 					<Desktop />
// 				</ReduxProvider>
// 			)
// 	}
// }
