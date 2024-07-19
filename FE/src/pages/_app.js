import { Analytics } from '@vercel/analytics/react'
import '@/presentation/assets/style/Global.css'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<Analytics />
		</>
	)
}

export default MyApp
