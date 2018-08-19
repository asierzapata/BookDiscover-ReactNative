import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction, BaseAction } from '../../modules/actions_interfaces';
import { BooksQueryField, Book, BooksQueryOptions, BooksQueryOrderBy, BooksQueryLanguage } from '../../api/book/book_interfaces';
import { SearchEngine } from '../../api/user/user_interfaces';

export interface OwnState {
    openAdvancedSearch: boolean
    searchQuery: string
    lastSearchQuery: string
    page: number
    activeSlide: number
    errorMessage?: string 
    queryParams: {
        queryModality: BooksQueryField
        queryOrderBy?: BooksQueryOrderBy
        queryLanguage?: BooksQueryLanguage
    },
    lastQueryParams: {
        queryModality: BooksQueryField
        queryOrderBy?: BooksQueryOrderBy
        queryLanguage?: BooksQueryLanguage
    }
}

export interface OwnProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {
    fetchBooksByQueryStatus: AsyncActionStatus
    searchBooks: Book[]
    userSearchEngine: SearchEngine
}


export interface DispatchProps {
    handleFetchBooksByQuery: (query: string, page: number, engine: SearchEngine, queryField: BooksQueryField, queryOptions: BooksQueryOptions) => AsyncAction
    handleClearSearchBooks: () => BaseAction
}

export interface Card {
    title: string
    items: Array<
        {
            key: string,
            value: string
        }
    >
    value: string
    onValueChange: ({ key }: { key: any }) => void
}