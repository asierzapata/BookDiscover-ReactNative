import { ApiResponse } from "../config/api_interfaces";

/* ====================================================== */
/*                           Interfaces                   */
/* ====================================================== */

export interface Book {
	title: string
	authors: string[]
	publisher: string
	publishedDate: string
	description: string
	ISBN: string
	pageCount: number
	categories: string[]
	language: string
	thumbnail: string
}

export interface BookApiObject {
	getBookInfoByISBN: ({ ISBN }: { ISBN: string }) => Promise<ApiResponse>
	getBooksByQuery: ({ query, page }: { query: string; page: number }) => Promise<{}>
}
