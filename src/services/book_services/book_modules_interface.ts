import { Book } from '../../api/book/book_interfaces'

export interface BookModule {
    searchByISBN: ({ ISBN }: BookModuleMethodsInput, page: number) => Promise<Book[]>
    searchByStandardQuery: ({ query }: BookModuleMethodsInput, page: number) => Promise<Book[]>
    searchByAuthor: ({ author }: BookModuleMethodsInput, page: number) => Promise<Book[]>
    searchByTitle: ({ title }: BookModuleMethodsInput, page: number) => Promise<Book[]>
    searchBySubject: ({ subject }: BookModuleMethodsInput, page: number) => Promise<Book[]>
    searchByPublisher: ({ publisher }: BookModuleMethodsInput, page: number) => Promise<Book[]>
    getEditionsByISBN: ({ ISBN }: BookModuleMethodsInput) => Promise<string[]>
}

export interface BookModuleMethodsInput {
    ISBN?: string
    query?: string
    author?: string
    title?: string
    subject?: string
    publisher?: string
}

export const LIMIT = 20