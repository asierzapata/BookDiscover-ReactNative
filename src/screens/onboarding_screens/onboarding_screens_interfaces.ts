import { NavigationScreenProps } from 'react-navigation'
import { AsyncActionStatus } from '../../modules/api_metadata/api_metadata_module'
import { AsyncAction } from '../../modules/actions_interfaces'
import { Region } from '../../modules/user/user_module';

export interface RegionSelectState {
	region: {
		key: Region,
		value: string
	}
}
export interface RegionSelectProps extends NavigationScreenProps, RegionSelectStateProps, RegionSelectDispatchProps {}

export interface RegionSelectStateProps {
	fetchSetRegionStatus: AsyncActionStatus
}

export interface RegionSelectDispatchProps {
	handleSetRegion: (region: Region) => AsyncAction
}