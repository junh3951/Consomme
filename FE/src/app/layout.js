// 'use client'

// import { Inter } from "next/font/google";
// import "./globals.css";
// import { usePathname } from 'next/navigation'
// import Layout from '@/presentation/components/layout/##layout'

// const inter = Inter({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   const pathname = usePathname();

//   // main과 signup 페이지를 제외한 모든 페이지에 레이아웃 적용
//   if (pathname === '/' || pathname === '/signup_page') {
//     return (
//       <html lang="en">
//         <body className={inter.className}>{children}</body>
//       </html>
//     )
//   }

//   // 페이지별 activePage 설정
//   let activePage = ''
//   if (pathname === '/recommned_page') {
//     activePage = 'recommned_page'
//   } else if (pathname === '/result_page') {
//     activePage = 'recommned_page'
//   } else if (pathname === '/archive_page') {
//     activePage = 'archive_page'
//   } else if (pathname === '/detail_page') {
//     activePage = 'archive_page'
//   }

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Layout activePage={activePage}>
//           {children}
//         </Layout>
//       </body>
//     </html>
//   );
// }

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
