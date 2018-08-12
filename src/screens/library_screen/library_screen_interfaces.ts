import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction } from '../../modules/actions_interfaces'
import { Book } from '../../api/book/book_interfaces';

export interface ownState{
    fetchingISBN?: string
    openSearchInput: boolean
    openSectionSelectionModal: boolean
    forceClear: boolean
    searchQuery : string
    currentSection: 'library' | 'favourites' | 'toRead' | 'readingNow' | 'haveRead'
}

export interface ownProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {
    fetchUserBooksStatus: AsyncActionStatus
    populateBookByISBN: AsyncActionStatus
    userBooks: any
    arrayUserBooks: Book[]
}

export interface DispatchProps {
    handleFetchUserBooks: () => AsyncAction
    handlePopulateBookByISBN: (ISBN: string) => AsyncAction
}

export const SECTIONS = {
    LIBRARY: 'library',
    FAVOURITES: 'favourites',
    TO_READ: 'toRead',
    READING_NOW: 'readingNow',
    HAVE_READ: 'haveRead'
}
