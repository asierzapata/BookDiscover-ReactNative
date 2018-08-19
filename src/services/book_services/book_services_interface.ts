import { Book, BooksQueryOptions } from '../../api/book/book_interfaces'

export interface BookService {
    searchByISBN: ({ ISBN }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions) => Promise<Book[]>
    searchByStandardQuery: ({ query }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions) => Promise<Book[]>
    searchByAuthor: ({ author }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions) => Promise<Book[]>
    searchByTitle: ({ title }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions) => Promise<Book[]>
    searchBySubject: ({ subject }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions) => Promise<Book[]>
    searchByPublisher: ({ publisher }: BookServiceMethodsInput, page: number, queryOptions?: BooksQueryOptions) => Promise<Book[]>
    getEditionsByISBN: ({ ISBN }: BookServiceMethodsInput, queryOptions?: BooksQueryOptions) => Promise<string[]>
}

export interface BookServiceMethodsInput {
    ISBN?: string
    query?: string
    author?: string
    title?: string
    subject?: string
    publisher?: string
}

export const LIMIT = 20