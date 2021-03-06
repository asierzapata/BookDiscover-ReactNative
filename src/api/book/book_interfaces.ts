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
	[key: string]: any| undefined
}

export interface BookApiObject {
	getBookInfoByISBN: ({ ISBN }: { ISBN: string }) => Promise<ApiResponse>
	getBooksByQuery: ({ query, queryOptions, queryField, page }: { query: string, page: number, queryOptions?: BooksQueryOptions, queryField?: BooksQueryFields}) => Promise<{}>
}

export interface BooksQueryOptions {
	orderBy?: 'relevance' | 'newest'
	langRestrict?: string
}

export const ORDER_BY_FIELDS = {
	relevance: 'Relevance',
	newest: 'Newest'
}

export interface BooksQueryFields {
	inauthor?: string
	intitle?: string
	inpublisher?: string
	subject?: string
	[key: string]: string | undefined
}

export const QUERY_MODALITY_FIELDS = {
	inauthor: 'Author',
	intitle: 'Title',
	inpublisher: 'Publisher',
	subject: 'Subject'
}

export interface AddBookParams extends Book, BookSections {}

export interface BookSections {
	section: 'favourites' | 'toRead' | 'readingNow' | 'haveRead'
}

export const BOOK_SECTIONS = {
	'library': 'Library',
	'favourites': 'Favourites',
	'toRead': 'To Read',
	'readingNow': 'Reading Now',
	'haveRead': 'Have Read'
}