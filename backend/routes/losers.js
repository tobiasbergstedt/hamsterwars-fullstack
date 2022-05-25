import express from 'express'
const router = express.Router()
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../database/firebase.js'

router.get('/', async (req, res) => {
	const colRef = collection(db, 'matches')
	let losers = []
	const snapshot = await getDocs(colRef)
	snapshot.docs.forEach((docSnapshot) => {
		losers.push({ ...docSnapshot.data(), id: docSnapshot.id })
	})

	if (losers && losers.length > 0) {
		let loserIds = losers.map(function (p) {
			return p.loserId
		})

		const result = loserIds.reduce((result, item) => {
			const count = result[item]

			if (count === undefined) {
				result[item] = 1
			} else {
				result[item] += 1
			}

			return result
		}, {})

		const entries = Object.entries(result)

		let mostFrequentloserIds = entries
			.sort((entryA, entryB) => entryB[1] - entryA[1])
			.slice(0, 5)

		const colRef2 = collection(db, 'hamsters')
		let mostFrequentLosers = []
		const snapshot = await getDocs(colRef2)
		snapshot.docs.forEach((docSnapshot) => {
			mostFrequentLosers.push({ ...docSnapshot.data(), id: docSnapshot.id })
		})

		let mostFrequent = []
		for (let i = 0; i < mostFrequentloserIds.length; i++) {
			mostFrequent.push(mostFrequentloserIds[i][0])
		}

		mostFrequentLosers = mostFrequentLosers
			.filter((p) => mostFrequent.includes(p.id))
			.sort((a, b) => b.defeats - a.defeats)

		res.status(200).send(mostFrequentLosers)
		return
	}

	res.sendStatus(404)
	return
})

export default router
