import _ from 'lodash'
import { Book } from './book_interfaces';

/* ====================================================== */
/*                           API                          */
/* ====================================================== */

export default {
	parseGoogleReponse,
	parseIndividualBook
}

const bookPlaceholder =
	'http://www.py.undp.org/etc/designs/UNDPGlobalDesign/clientlibs/digitallibrary/css/book-cover-placeholder.png'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function parseGoogleReponse(data: any): Book[] {
	let books = _.map(data.items, book => parseIndividualBook(book.volumeInfo))
	return books
}

function parseIndividualBook(book: any): Book {
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

	_.forEach(industryIdentifiers, (identifier: { identifier: string; type: string }) => {
		if (identifier.type === 'ISBN_13') ISBN = identifier.identifier
	})

	// TODO: replace the empty string for a suitable placeholder
	let thumbnail = imageLinks ? (imageLinks.thumbnail ? imageLinks.thumbnail : '') : bookPlaceholder

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
