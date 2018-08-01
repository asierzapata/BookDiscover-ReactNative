import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction } from '../../modules/actions_interfaces';
import { Book } from '../../api/parsers/books_parser';

export interface ownState {
    error?: string
}

export interface ownProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {
    book: Book,
    fetchAddBookUserStatus: AsyncActionStatus
}


export interface DispatchProps {
    handleAddBookUser: ({ ISBN, thumbnail }: Book) => AsyncAction
    handleFetchUserBooks: () => AsyncAction
}
