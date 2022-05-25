import express from 'express'
const router = express.Router()

const data = [
	{ name: 'apple', price: 3 },
	{ name: 'orange', price: 30 },
	{ name: 'grapes', price: 7 },
	{ name: 'baNaNa', price: 12 },
]

// GET /fruits/
router.get('/', (req, res) => {
	res.send(data)
})

// POST /fruits
router.post('/', (req, res) => {
	// Obs! Validera innan ni laddar upp till FireStore
	const newFruit = req.body
	console.log('POST new fruit: ', newFruit)
	data.push(newFruit)
	res.sendStatus(200)
})

export default router
