/* ====================================================== */
/*                   	Parsers                           */
/* ====================================================== */

import { ApiResponse } from '../config/api_config'

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
	addBookToUser: ({ ISBN, thumbnail }: BookInterface) => Promise<ApiResponse>
	getUserInfo: () => Promise<ApiResponse>
	logoutUser: () => Promise<ApiResponse>
	logIn: ({ email, password }: AuthData) => Promise<ApiResponse>
	signUp: ({ email, password }: AuthData) => Promise<ApiResponse>
	addUser: (user: firebase.User) => Promise<ApiResponse>
}
