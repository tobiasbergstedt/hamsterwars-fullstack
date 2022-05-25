import { collection, doc, updateDoc } from 'firebase/firestore'

import { db } from './firebase.js'

async function updateScript(newData) {
	const idToUpdate = newData.id

	const colRef = collection(db, 'hamsters')
	const oldDocRef = doc(colRef, idToUpdate)

	updateDoc(oldDocRef, newData)
}

export default updateScript
