interface OpenLibrarySearchResponse {
    start: number
    num_found: number
    numFound: number
    docs: OpenLibraryBook[]
}

interface OpenLibraryBook {
    title: string
    cover_i: number
    isbn: string[]
    author_name: string
    author_key: string[]
    key: string
    subject: string[]
    publisher: string[]
    first_publish_year: number
    edition_count: number
    language: string[]
    edition_key: string[]
}

interface OpenLibraryBookResponse {
    description: any
    title: string
}
