import express from 'express'
const router = express.Router()
import {
	collection,
	getDocs,
	doc,
	getDoc,
	addDoc,
	updateDoc,
} from 'firebase/firestore'
import { db } from '../database/firebase.js'
import addMatches from '../database/addMatches.js'
import updateMatches from '../database/updateMatches.js'
import deleteMatches from '../database/deleteMatches.js'

router.get('/', async (req, res) => {
	const colRef = collection(db, 'matches')
	let matches = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		matches.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	if (matches && matches.length > 0) {
		res.status(200).send(matches)
		return
	}

	res.sendStatus(404)
	return
})

router.get('/:id', async (req, res) => {
	const colRef = collection(db, 'matches')
	let idString = req.params.id
	let matches = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		matches.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	matches = matches.filter((p) => p.id === idString)

	if (matches.length > 0) {
		res.status(200).send(matches[0])
		return
	}

	res.sendStatus(404)
	return
})

router.post('/', async (req, res) => {
	if (req.body.winnerId && req.body.loserId) {
		let newMatch = {
			winnerId: req.body.winnerId,
			loserId: req.body.loserId,
		}

		var newMatchId = await addMatches(newMatch)
		res.status(200).send({ id: newMatchId })
		return
	}

	res.sendStatus(400)
	return
})

router.put('/:id', async (req, res) => {
	const colRef = collection(db, 'matches')
	let idString = req.params.id
	let matches = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		matches.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	matches = matches.filter((p) => p.id === idString)

	if (matches.length > 0) {
		let newData = {
			loserId: req.body.loserId || matches[0].loserId,
			winnerId: req.body.winnerId || matches[0].winnerId,
			id: idString,
		}

		if (
			newData.loserId === matches[0].loserId &&
			newData.winnerId === matches[0].winnerId
		) {
			res.sendStatus(400)
			return
		}

		await updateMatches(newData)
		res.sendStatus(200)
		return
	}

	res.sendStatus(400)
	return
})

router.delete('/:id', async (req, res) => {
	let toBeDeleted = req.params.id
	const colRef = collection(db, 'matches')
	let matches = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		matches.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	matches = matches.filter((p) => p.id === toBeDeleted)

	if (matches.length > 0) {
		await deleteMatches(toBeDeleted)
		res.sendStatus(200)
		return
	}

	res.sendStatus(404)
	return
})

export default router
