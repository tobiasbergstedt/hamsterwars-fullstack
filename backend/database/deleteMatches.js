import { collection, doc, deleteDoc } from 'firebase/firestore'

import { db } from './firebase.js'

async function deleteMatches(toBeDeleted) {
	const idToRemove = toBeDeleted

	const colRef = collection(db, 'matches')

	const docRef = doc(colRef, idToRemove)

	await deleteDoc(docRef)
}

export default deleteMatches
