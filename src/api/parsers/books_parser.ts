import _ from 'lodash'

/* ====================================================== */
/*                           API                          */
/* ====================================================== */
export default {
    parseGoogleReponse
}

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function parseGoogleReponse(data: any){
    let books = _.map(data.items, (book) => _parseIndividualBook(book.volumeInfo))
    return books 
}

function _parseIndividualBook(book: any) {
    const { 
        title, 
        authors, 
        publisher, 
        publishedDate, 
        description,
        industryIdentifiers,
        pageCount,
        categories,
        language,
        imageLinks
    } = book

    let ISBN = ''

    _.forEach(industryIdentifiers, (identifier: {identifier: string, type: string}) => {
        if(identifier.type === 'ISBN_13') ISBN = identifier.identifier
    }) 

    // TODO: replace the empty string for a suitable placeholder
    let thumbnail = imageLinks ? (imageLinks.thumbnail ? imageLinks.thumbnail : '') : ''

    return {
        title, 
        authors, 
        publisher, 
        publishedDate, 
        description,
        ISBN,
        pageCount,
        categories,
        language,
        thumbnail
    }
}