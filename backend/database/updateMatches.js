import { collection, doc, updateDoc } from 'firebase/firestore'

import { db } from './firebase.js'

async function updateMatches(newData) {
	const idToUpdate = newData.id

	const colRef = collection(db, 'matches')
	const oldDocRef = doc(colRef, idToUpdate)

	updateDoc(oldDocRef, newData)
}

export default updateMatches
