const BASE_PATH = 'https://openlibrary.org'

export default {
    BASE_PATH,
    SEARCH_PATH: `${BASE_PATH}/search.json`,
    QUERY_PARAMS : {
        QUERY_STANDARD: {
            key: 'q',
            separator: '='
        },
        QUERY_ISBN: {
            key: 'isbn',
            separator: '='
        },
        QUERY_TITLE: {
            key: 'title',
            separator: '='  
        },
        QUERY_AUTHOR: {
            key: 'author',
            separator: '='
        },
        QUERY_SUBJECT: {
            key: 'subject',
            separator: '='
        },
        QUERY_PUBLISHER: {
            key: 'publisher',
            separator: '='
        },
    }
}