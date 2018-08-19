import { Book } from '../../api/book/book_interfaces'

export interface BookService {
    searchByISBN: ({ ISBN }: BookServiceMethodsInput, page: number) => Promise<Book[]>
    searchByStandardQuery: ({ query }: BookServiceMethodsInput, page: number) => Promise<Book[]>
    searchByAuthor: ({ author }: BookServiceMethodsInput, page: number) => Promise<Book[]>
    searchByTitle: ({ title }: BookServiceMethodsInput, page: number) => Promise<Book[]>
    searchBySubject: ({ subject }: BookServiceMethodsInput, page: number) => Promise<Book[]>
    searchByPublisher: ({ publisher }: BookServiceMethodsInput, page: number) => Promise<Book[]>
    getEditionsByISBN: ({ ISBN }: BookServiceMethodsInput) => Promise<string[]>
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