import React from 'react'
import './loading.css'
import Image from 'next/image'
import loadingimage from '@/presentation/assets/image/loading-popcorn.gif'

function Loading() {
	return (
		<div className="loading-spinner-container">
			<Image src={loadingimage} alt="Loading..." className="loading-gif" />
		</div>
	)
}

export default Loading
