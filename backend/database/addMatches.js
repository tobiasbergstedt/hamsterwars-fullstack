import { collection, addDoc } from 'firebase/firestore'

import { db } from './firebase.js'

async function addMatches(newMatch) {
	const colRef = collection(db, 'matches')
	const newDocRef = await addDoc(colRef, newMatch)

	console.log('Lade till nytt matchdokument med ', { id: newDocRef.id })

	let newId = newDocRef.id

	return newId
}

export default addMatches
