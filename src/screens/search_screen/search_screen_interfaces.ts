import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction, BaseAction } from '../../modules/actions_interfaces';
import { BooksQueryOptions, BooksQueryFields, QUERY_MODALITY_FIELDS, ORDER_BY_FIELDS } from '../../api/book/book_interfaces';

export interface ownState {
    openAdvancedSearch: boolean
    queryLanguage: string,
    queryOrderBy: 'relevance' | 'newest'
    queryModality: '' | 'author' | 'title' | 'publisher' | 'subject'
    searchQuery: string
    lastSearchQuery: string
    lastQueryOrderBy: 'relevance' | 'newest',
    lastQueryModality: '' | 'author' | 'title' | 'publisher' | 'subject',
    lastQueryLanguage: string,
    page: number
    activeSlide: number
    errorMessage?: string 
}

export interface ownProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {
    fetchBooksByQueryStatus: AsyncActionStatus
    searchBooks: any
}


export interface DispatchProps {
    handleFetchBooksByQuery: (query: string, page: number, queryOptions: BooksQueryOptions, queryField: BooksQueryFields) => AsyncAction
    handleClearSearchBooks: () => BaseAction
}