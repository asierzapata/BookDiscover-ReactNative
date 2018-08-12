import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction } from '../../modules/actions_interfaces'
import { Book } from '../../api/book/book_interfaces'

// import { User } from '../../api/parsers/user_parser'

export interface ownState {
	errorMessage?: string
}

export interface ownProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {
	fetchUserBooksStatus: AsyncActionStatus
	books: Book[]
}

export interface DispatchProps {
	handleLogout: () => AsyncAction
	handleFetchUserBooks: () => AsyncAction
}
