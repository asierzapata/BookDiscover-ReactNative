import _ from 'lodash'
import { Book } from '../../../api/book/book_interfaces'

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
	const books = _.map(data.items, book => parseIndividualBook(book.volumeInfo))
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

	let ISBN: string[] = []

	_.forEach(industryIdentifiers, (identifier: { identifier: string; type: string }) => {
		if (identifier.type === 'ISBN_13') ISBN = [ identifier.identifier ]
	})

	// TODO: replace the empty string for a suitable placeholder
	const thumbnail = imageLinks ? (imageLinks.thumbnail ? _removeCurlEdgeCoverAndZoom(imageLinks.thumbnail) : '') : bookPlaceholder

	return {
		title,
		authors,
		publisher,
		publishedDate,
		description,
		ISBN,
		pageCount,
		subject: categories,
		language,
		work_key: '',
		edition_key: [],
		thumbnail,
	}
}

function _removeCurlEdgeCoverAndZoom(thumbnail: string) {
	const curlessURL = _.split(thumbnail, '&edge=curl')
	const zoomlessURL = _.split(_.join(curlessURL, ''), '&zoom=1')
	return _.join(zoomlessURL, '')
}
