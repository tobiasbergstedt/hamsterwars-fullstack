import express from 'express'
const router = express.Router()
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore'
import { db } from '../database/firebase.js'

router.get('/:id', async (req, res) => {
	const colRef = collection(db, 'matches')
	let idString = req.params.id
	let matches = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		matches.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	matches = matches.filter((p) => p.winnerId === idString)

	if (matches && matches.length > 0) {
		res.send(matches)
		return
	}

	res.sendStatus(404)
	return
})

export default router
