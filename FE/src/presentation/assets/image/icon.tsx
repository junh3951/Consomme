import React from 'react'

const icons = {
	'logo-ribbon': (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="791"
			height="562"
			viewBox="0 0 791 562"
			fill="none"
		>
			<path
				d="M25.9235 536.196C315.384 504.828 514.08 326.481 549.832 189.191C566.657 124.585 557.14 54.6015 467.961 29.3067C407.074 12.0368 342.687 49.8338 305.907 104.276C235.038 209.176 295.96 321.886 425.052 354.783C521.736 379.42 680.824 364.762 765.173 332.865"
				stroke="white"
				style={{
					stroke: 'white',
					strokeOpacity: 1,
					strokeWidth: '50',
					strokeLinecap: 'round',
				}}
			/>
		</svg>
	),
	'logo-icon': (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="52"
			height="52"
			viewBox="0 0 52 52"
			fill="none"
		>
			<g clipPath="url(#clip0_103_2810)">
				<rect
					width="52"
					height="52"
					rx="12"
					fill="#2F2F2F"
					style={{ fill: '#2F2F2F', fillOpacity: 1 }}
				/>
				<path
					d="M13.9995 40.5002C29.0272 38.8717 39.3427 29.6126 41.1989 22.4851C42.0724 19.131 41.5783 15.4977 36.9484 14.1845C33.7874 13.2879 30.4447 15.2502 28.5352 18.0766C24.8559 23.5226 28.0188 29.3741 34.7208 31.0819C39.7402 32.361 47.9995 31.6001 52.3786 29.9441"
					stroke="white"
					style={{ stroke: 'white', strokeOpacity: 1 }}
					strokeWidth="5"
					strokeLinecap="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_103_2810">
					<rect
						width="52"
						height="52"
						fill="white"
						style={{ fill: 'white', fillOpacity: 1 }}
					/>
				</clipPath>
			</defs>
		</svg>
	),
	back: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="4"
			viewBox="0 0 20 4"
			fill="none"
		>
			<path
				d="M2 2H18.4706"
				stroke="#191919"
				style={{ stroke: '#191919', strokeOpacity: 1 }}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	),
}

const Icon = ({ type, ...props }) => {
	return React.cloneElement(icons[type], props)
}

export default Icon
