/* ====================================================== */
/*                           Interfaces                   */
/* ====================================================== */

export interface ApiResponse {
	headers: string
	status: string
	statusText: string
	data: any
}

export interface ApiError {
	code: number
	message: string
}
