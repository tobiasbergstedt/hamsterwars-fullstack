import { collection, addDoc } from 'firebase/firestore'

import { db } from './firebase.js'

async function addScript(newHamster) {
	const colRef = collection(db, 'hamsters')
	const newDocRef = await addDoc(colRef, newHamster)

	console.log('Lade till nytt hamsterdokument med ', { id: newDocRef.id })

	let newId = newDocRef.id

	return newId
}

export default addScript
