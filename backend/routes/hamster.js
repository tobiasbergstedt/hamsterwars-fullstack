import express from 'express'
const router = express.Router()
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore'
import { db } from '../database/firebase.js'
import addScript from '../database/addScript.js'
import updateScript from '../database/updateScript.js'
import deleteScript from '../database/deleteScript.js'

router.get('/', async (req, res) => {
	const colRef = collection(db, 'hamsters')
	let hamsters = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	if (hamsters && hamsters.length > 0) {
		res.send(hamsters)
		return
	}

	res.sendStatus(404)
	return
})

router.get('/random', async (req, res) => {
	const colRef = collection(db, 'hamsters')
	let hamsters = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	if (hamsters && hamsters.length > 0) {
		res.send(hamsters[Math.floor(Math.random() * hamsters.length)])
		return
	}

	res.sendStatus(404)
	return
})

router.get('/cutest', async (req, res) => {
	const colRef = collection(db, 'hamsters')
	let hamsters = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	if (hamsters && hamsters.length > 0) {
		let maxDifferential = hamsters
			.map((h) => h.wins - h.defeats)
			.reduce((acc, cur) => Math.max(acc, cur), -1000)

		let cutest = hamsters.filter((h) => h.wins - h.defeats === maxDifferential)

		res.status(200).send(cutest)
		return
	}

	res.sendStatus(404)
	return
})

router.get('/:id', async (req, res) => {
	const colRef = collection(db, 'hamsters')
	let idString = req.params.id
	let hamsters = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	hamsters = hamsters.filter((p) => p.id === idString)

	if (hamsters.length === 1) {
		res.send(hamsters[0])
		return
	}

	if (hamsters.length === 0) {
		res.sendStatus(404)
		return
	}

	res.sendStatus(400)
})

router.post('/', async (req, res) => {
	if (req.body) {
		let newHamster = {
			name: req.body.name,
			age: Number(req.body.age),
			favFood: req.body.favFood,
			loves: req.body.loves,
			imgName: req.body.imgName,
			wins: Number(req.body.wins),
			defeats: Number(req.body.defeats),
			games: Number(req.body.games),
		}

		var newHamsterId = await addScript(newHamster)
		res.status(200).send({ id: newHamsterId })
		return
	}

	res.sendStatus(400)
	return
})

router.put('/:id', async (req, res) => {
	const colRef = collection(db, 'hamsters')
	let idString = req.params.id
	let hamsters = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	hamsters = hamsters.filter((p) => p.id === idString)

	if (hamsters.length > 0) {
		let newData = {
			name: req.body.name || hamsters[0].name,
			age: Number(req.body.age) || hamsters[0].age,
			favFood: req.body.favFood || hamsters[0].favFood,
			loves: req.body.loves || hamsters[0].loves,
			imgName: req.body.imgName || hamsters[0].imgName,
			wins: Number(req.body.wins) || hamsters[0].wins,
			defeats: Number(req.body.defeats) || hamsters[0].defeats,
			games: Number(req.body.games) || hamsters[0].games,
			id: idString,

			// Använd koden nedan för att nollställa matcherna
			// name: req.body.name || hamsters[0].name,
			// age: Number(req.body.age) || hamsters[0].age,
			// favFood: req.body.favFood || hamsters[0].favFood,
			// loves: req.body.loves || hamsters[0].loves,
			// imgName: req.body.imgName || hamsters[0].imgName,
			// wins: 0,
			// defeats: 0,
			// games: 0,
			// id: idString
		}
		if (
			newData.name === hamsters[0].name &&
			newData.age === hamsters[0].age &&
			newData.favFood === hamsters[0].favFood &&
			newData.loves === hamsters[0].loves &&
			newData.imgName === hamsters[0].imgName &&
			newData.wins === hamsters[0].wins &&
			newData.defeats === hamsters[0].defeats &&
			newData.games === hamsters[0].games
		) {
			res.sendStatus(400)
			return
		}
		updateScript(newData)
		res.sendStatus(200)
		return
	}

	res.sendStatus(404)
	return
})

router.delete('/:id', async (req, res) => {
	let toBeDeleted = req.params.id
	const colRef = collection(db, 'hamsters')
	let hamsters = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	hamsters = hamsters.filter((p) => p.id === toBeDeleted)

	if (hamsters.length > 0) {
		deleteScript(toBeDeleted)
		res.sendStatus(200)
		return
	}

	res.sendStatus(404)
	return
})

export default router
