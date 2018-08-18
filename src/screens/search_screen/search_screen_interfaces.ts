import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction, BaseAction } from '../../modules/actions_interfaces';
import { BooksQueryField, Book } from '../../api/book/book_interfaces';

export interface OwnState {
    openAdvancedSearch: boolean
    queryModality: BooksQueryField
    searchQuery: string
    lastSearchQuery: string
    lastQueryModality: BooksQueryField,
    page: number
    activeSlide: number
    errorMessage?: string 
}

export interface OwnProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {
    fetchBooksByQueryStatus: AsyncActionStatus
    searchBooks: Book[]
}


export interface DispatchProps {
    handleFetchBooksByQuery: (query: string, page: number, queryField: BooksQueryField) => AsyncAction
    handleClearSearchBooks: () => BaseAction
}