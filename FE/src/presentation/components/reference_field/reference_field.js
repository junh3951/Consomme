import React from 'react'
import './reference_field.css'

const getYouTubeVideoID = (url) => {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
	const match = url.match(regExp)
	return (match && match[2].length === 11) ? match[2] : null
}

const getYouTubeThumbnailURL = (videoID) => {
	return `https://img.youtube.com/vi/${videoID}/0.jpg`
}

const ReferenceField = ({ references }) => (
	<div className="reference-field-container">
		<div className="reference-field">
			{references.map((ref, index) => {
				const videoID = getYouTubeVideoID(ref.link)
				const thumbnailURL = videoID ? getYouTubeThumbnailURL(videoID) : null
				return (
					<a key={index} href={ref.link} className="reference-item">
						{thumbnailURL && <img src={thumbnailURL} alt="YouTube Thumbnail" className="thumbnail" />}
						<div className="reference-details">
							<p className="reference-title">{ref.title}</p>
							<p className="reference-channel">{ref.channel}</p>
						</div>
					</a>
				)
			})}
		</div>
	</div>
)

export default ReferenceField
