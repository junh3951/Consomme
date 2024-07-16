const express = require('express')
const app = express()
const port = 3000

app.get('/main', (req, res) => {
	console.log('hello world')
	res.send('Check the server console for a message!')
})

app.listen(port, '0.0.0.0', () => {
	console.log(`Server is running at http://localhost:${port}`)
})
