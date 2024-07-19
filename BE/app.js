const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 3000

const corsOptions = {
	origin: 'https://consomme.vercel.app', // 요청을 허용할 도메인
	optionsSuccessStatus: 200, // 일부 브라우저에서의 성공 상태 코드를 위해 필요
}

app.use(cors(corsOptions))
app.use(express.json())

app.get('/main', (req, res) => {
	console.log('hello world')
	res.send('Check the server console for a message!')
})

app.post('/search', async (req, res) => {
	try {
		const { search_keyword, category } = req.body
		const response = await axios.post('http://localhost:5001/search', {
			search_keyword: search_keyword,
			category: category,
		})
		res.json(response.data)
	} catch (error) {
		console.error(error)
		res.status(500).send('Error during the search')
	}
})

app.post('/generate', async (req, res) => {
	try {
		const { search_keyword, category, chosen_keyword } = req.body
		const response = await axios.post('http://localhost:5001/generate', {
			search_keyword: search_keyword,
			category: category,
			chosen_keyword: chosen_keyword,
		})
		res.json(response.data)
	} catch (error) {
		console.error(error)
		res.status(500).send('Error during the title generation')
	}
})

app.post('/enhance', async (req, res) => {
	try {
		const { selected_trending, enhancement_instruction } = req.body
		const response = await axios.post('http://localhost:5001/enhance', {
			selected_trending: selected_trending,
			enhancement_instruction: enhancement_instruction,
		})
		res.json(response.data)
	} catch (error) {
		console.error(error)
		res.status(500).send('Error during the enhancement')
	}
})

app.listen(port, '0.0.0.0', () => {
	console.log(`Server is running at http://localhost:${port}`)
})
