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
	_id?: string
	work_key: string
	edition_key: string[]
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
	'standard' = 'standard',
	'title' = 'title',
	'author' = 'author',
	'isbn' = 'isbn',
	'subject' = 'subject'
}

export interface AddBookParams {
	_id?: string
	ISBN: string[]
	thumbnail: string
	title: string
	section: BookSections
	work_key: string
	edition_key: string[]
}

export type BookSections = 'favourites' | 'toRead' | 'readingNow' | 'haveRead'


export const BOOK_SECTIONS = {
	'library': 'Library',
	'favourites': 'Favourites',
	'toRead': 'To Read',
	'readingNow': 'Reading Now',
	'haveRead': 'Have Read'
}