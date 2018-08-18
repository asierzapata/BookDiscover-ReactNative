import { ApiResponse } from "../config/api_interfaces";

/* ====================================================== */
/*                           Interfaces                   */
/* ====================================================== */

export interface Book {
	title: string
	authors: string[]
	publisher: string[]
	publishedDate: string
	description: string
	ISBN: string[]
	pageCount?: number
	subject: string[]
	language: string[]
	thumbnail: string
	[key: string]: any | undefined
}

export interface BookApiObject {
	getBookInfoByISBN: ({ ISBN }: { ISBN: string }) => Promise<ApiResponse>
	getBooksByQuery: ({ query, queryField, page }: { query: string, page: number, queryField?: BooksQueryFields }) => Promise<ApiResponse>
	createNewBook: ( ISBN: string[], OpenLibrary: { work_key: string, edition_key: string[] } ) => Promise<string>
}

export type BooksQueryField = 
	BooksQueryFields.standard | BooksQueryFields.title | BooksQueryFields.author | BooksQueryFields.isbn | BooksQueryFields.subject

export enum BooksQueryFields {
	'standard',
	'title',
	'author',
	'isbn',
	'subject'
}

export interface AddBookParams extends Book, BookSections {
	work_key: string
	edition_key: string[]
}

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