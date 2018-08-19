const BASE_PATH = 'https://www.googleapis.com'

export default {
    BASE_PATH,
    SEARCH_PATH: `${BASE_PATH}/books/v1/volumes`,
    QUERY_PARAMS : {
        QUERY_STANDARD: {
            key: '',
            separator: ''
        },
        QUERY_ISBN: {
            key: 'isbn',
            separator: ':'
        },
        QUERY_TITLE: {
            key: 'intitle',
            separator: ':'
        },
        QUERY_AUTHOR: {
            key: 'inauthor',
            separator: ':'
        },
        QUERY_SUBJECT: {
            key: 'subject',
            separator: ':'
        },
        QUERY_PUBLISHER: {
            key: 'inpublisher',
            separator: ':'
        },
    },
    QUERY_OPTIONS: {
        'queryLanguage': 'langRestrict',
        'queryOrderBy': 'orderBy',
    } as { [key: string]: string }
}