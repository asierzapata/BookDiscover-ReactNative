import _ from 'lodash'
import { Book } from '../../../api/book/book_interfaces'

/* ====================================================== */
/*                           API                          */
/* ====================================================== */

export default {
	parseOpenLibraryReponse,
	parseIndividualBook
}

const bookPlaceholder =
	'http://www.py.undp.org/etc/designs/UNDPGlobalDesign/clientlibs/digitallibrary/css/book-cover-placeholder.png'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function parseOpenLibraryReponse(data: OpenLibraryBook[], descriptions: OpenLibraryBookResponse[]): Book[] {
    const books = _.map(data, (book, index) => parseIndividualBook(book,descriptions[index]))
    console.log('>>>>>> PARSE OPEN LIBRARY RESPOSNSE', books)
	return books
}

function parseIndividualBook(book: OpenLibraryBook, { description }: OpenLibraryBookResponse): Book {
    const {
        title,
        cover_i,
        isbn,
        author_name,
        author_key,
        subject,
        publisher,
        first_publish_year,
        edition_count,
        key,
	    edition_key,
        language
    } = book

    return {
        title,
        authors: [ author_name ],
        publisher: publisher ? publisher : [],
        publishedDate: first_publish_year ? first_publish_year.toString() : 'Undefined',
        description: description ? ( description.value ? description.value : description ) : 'Description not available',
        ISBN: isbn ? isbn[0]: key,
        subject: subject ? subject : [],
        language: language ? language : [],
        work_key: key,
	    edition_key: edition_key ? edition_key : [ key ],
        thumbnail: cover_i ? _getCoverUrl('id', cover_i.toString(), 'L') : bookPlaceholder
    }
}

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function _getCoverUrl(key: 'isbn' | 'id' , value: string, size: string) {
	return `http://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`
}