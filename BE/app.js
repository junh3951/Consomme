const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

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

app.listen(port, '0.0.0.0', () => {
	console.log(`Server is running at http://localhost:${port}`)
})
