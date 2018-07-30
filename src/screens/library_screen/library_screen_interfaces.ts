import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction } from '../../modules/actions_interfaces';
import { Book } from '../../api/parsers/books_parser';

export interface ownState {}

export interface ownProps extends NavigationScreenProps, StateProps, DispatchProps {}

export interface StateProps {
    fetchUserBooksStatus: AsyncActionStatus;
    userBooks: any;
}


export interface DispatchProps {
    handleFetchUserBooks: () => AsyncAction;
}
