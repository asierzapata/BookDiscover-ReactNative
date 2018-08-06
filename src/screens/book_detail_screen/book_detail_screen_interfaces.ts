import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction } from '../../modules/actions_interfaces'
import { Book } from '../../api/book/book_interfaces'

export interface ownState {
	error?: string
}

export interface ownProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {
	book: Book,
	previousScreen: string
	fetchAddBookUserStatus: AsyncActionStatus
	fetchDeleteBookUserStatus: AsyncActionStatus
}

export interface DispatchProps {
	handleAddBookUser: ({ ISBN, thumbnail, title }: Book) => AsyncAction
	handleDeleteBookUser: ({ ISBN }: Book) => AsyncAction
	handleFetchUserBooks: () => AsyncAction
}
