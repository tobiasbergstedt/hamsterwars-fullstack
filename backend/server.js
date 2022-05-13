const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const fruitsRouter = require('./routes/fruits.js')

// Konfiguration
const PORT = process.env.PORT || 1337
const distPath = path.join(__dirname, '/../dist/')
console.log('distpath: ', distPath)

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(distPath))
app.use('/img/', express.static(path.join(__dirname, '/hamsterimages/')))

// Endpoints
app.use('/fruits', fruitsRouter)

app.get('/', (req, res) => {
	console.log('Servern lever')
	res.send('Hello!')
})

app.listen(PORT, () => {
	console.log('Server is listening on port: ', PORT)
})
