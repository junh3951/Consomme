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
}

const Icon = ({ type, ...props }) => {
	return React.cloneElement(icons[type], props)
}

export default Icon
