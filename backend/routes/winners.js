import express from 'express'
const router = express.Router()
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../database/firebase.js'

router.get('/', async (req, res) => {
	const colRef = collection(db, 'matches')
	let winners = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		winners.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	if (winners && winners.length > 0) {
		let winnerIds = winners.map(function (p) {
			return p.winnerId
		})

		const result = winnerIds.reduce((result, item) => {
			const count = result[item]

			if (count === undefined) {
				result[item] = 1
			} else {
				result[item] += 1
			}

			return result
		}, {})

		const entries = Object.entries(result)

		let mostFrequentWinnerIds = entries
			.sort((entryA, entryB) => entryB[1] - entryA[1])
			.slice(0, 5)
		const colRef2 = collection(db, 'hamsters')
		let mostFrequentWinners = []
		const snapshot = await getDocs(colRef2)
		snapshot.docs.forEach((docSnapshot) => {
			mostFrequentWinners.push({ ...docSnapshot.data(), id: docSnapshot.id })
		})

		let mostFrequent = []
		for (let i = 0; i < mostFrequentWinnerIds.length; i++) {
			mostFrequent.push(mostFrequentWinnerIds[i][0])
		}

		mostFrequentWinners = mostFrequentWinners
			.filter((p) => mostFrequent.includes(p.id))
			.sort((a, b) => b.wins - a.wins)

		res.status(200).send(mostFrequentWinners)
		return
	}

	res.sendStatus(404)
	return
})

export default router
