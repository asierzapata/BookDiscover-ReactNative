import { ApiResponse } from '../config/api_interfaces'
import { Book as BookInterface } from '../book/book_interfaces'

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
	emailVerified: boolean
	displayName: string
	phoneNumber: number | null
	photoUrl: string | null
}

export interface UserApiObject {
	getUserBooks: () => Promise<ApiResponse>
	addBookToUser: ({ ISBN, thumbnail, title }: BookInterface) => Promise<ApiResponse>
	deleteBookToUser: ({ ISBN }: BookInterface) => Promise<ApiResponse>
	getUserInfo: () => Promise<ApiResponse>
	logOut: () => Promise<ApiResponse>
	logIn: ({ email, password }: AuthData) => Promise<ApiResponse>
	signUp: ({ email, password }: AuthData) => Promise<ApiResponse>
	addUser: (user: User) => Promise<ApiResponse>
}

export interface firestoreUserBooksSchema {
	[ISBN: string]: {
		ISBN: string
		thumbnail: string
		title: string
	}
}
