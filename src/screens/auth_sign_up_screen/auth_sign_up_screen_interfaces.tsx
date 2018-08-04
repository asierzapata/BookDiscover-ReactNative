import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction } from '../../modules/actions_interfaces'
import { AuthData } from '../../api/user/user_interfaces'

export interface ownState {
	email: string
	password: string
	errorMessage?: string
}

export interface ownProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {
	signUpStatus: AsyncActionStatus
}

export interface DispatchProps {
	handleSignUp: ({ email, password }: AuthData) => AsyncAction
}
