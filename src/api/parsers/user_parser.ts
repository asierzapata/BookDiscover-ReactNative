import { User } from 'firebase'

/* ====================================================== */
/*                           Interfaces                   */
/* ====================================================== */

export interface AuthData {
	email: string
	password: string
}

export interface User {
	_id: string
	email: string
	emailVerified: string
	displayName: string
	phoneNumber: number
	photoUrl: string
}

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

export function userParser(entityFromFirestore: User) {
	return {
		_id: entityFromFirestore.uid,
		email: entityFromFirestore.email,
		emailVerified: entityFromFirestore.emailVerified,
		displayName: entityFromFirestore.displayName || '',
		phoneNumber: entityFromFirestore.phoneNumber || null,
		photoURL: entityFromFirestore.photoURL || null
	}
}
