import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction } from '../../modules/actions_interfaces'

export interface OwnState {}

export interface OwnProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {}

export interface DispatchProps {
	handleFetchUserInfo: () => AsyncAction
}
