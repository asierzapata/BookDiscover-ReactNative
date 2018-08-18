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
        language
    } = book
    return {
        title,
        authors: [ author_name ],
        publisher,
        publishedDate: first_publish_year.toString(),
        description,
        ISBN: isbn,
        subject,
        language,
        thumbnail: _getCoverUrl('id', cover_i.toString(), 'L')
    }
}

/* ====================================================== */
/*                        Helpers                         */
/* ====================================================== */

function _getCoverUrl(key: 'isbn' | 'id' , value: string, size: string) {
	return `http://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`
}