import { User } from './user_interfaces'
import { UserInfo } from 'firebase';

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

export function authUserParser(entityFromFirestore: UserInfo) {
	return {
		_id: entityFromFirestore.uid,
		email: entityFromFirestore.email,
		displayName: entityFromFirestore.displayName || '',
		phoneNumber: entityFromFirestore.phoneNumber || null,
		photoURL: entityFromFirestore.photoURL || null,
	}
}


export function firebaseUserParser(entityFromFirestore: User) {
	return {
		_id: entityFromFirestore._id,
		email: entityFromFirestore.email,
		displayName: entityFromFirestore.displayName || '',
		phoneNumber: entityFromFirestore.phoneNumber || null,
		photoURL: entityFromFirestore.photoURL || null,
		settings: entityFromFirestore.settings
	}
}
