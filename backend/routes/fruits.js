const express = require('express')
const router = express.Router()

const data = ['apple', 'orange', 'grapes', 'baNaNa']

// GET /fruits/
router.get('/', (req, res) => {
	res.send(data)
})

module.exports = router
