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
// Logger
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.body)
	next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(distPath))
app.use('/img/', express.static(path.join(__dirname, '/hamsterimages/')))
app.use('/assets/', express.static(path.join(__dirname, '/assets/')))
//End MiddleWare

// Endpoints
app.use('/fruits', fruitsRouter)

// Övriga endpoints, för att fungera med React Router i frontend
app.all('*', (req, res) => {
	res.sendFile(distPath + 'index.html')
})

app.listen(PORT, () => {
	console.log('Server is listening on port: ', PORT)
})
