import { UserInfo } from 'firebase'

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

export function userParser(entityFromFirestore: UserInfo) {
	return {
		_id: entityFromFirestore.uid,
		email: entityFromFirestore.email,
		displayName: entityFromFirestore.displayName || '',
		phoneNumber: entityFromFirestore.phoneNumber || null,
		photoURL: entityFromFirestore.photoURL || null
	}
}
