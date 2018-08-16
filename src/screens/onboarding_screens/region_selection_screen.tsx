import React, { Component } from 'react'
import { connect } from 'react-redux'

/* ====================================================== */
/*                   Actions / Selectors                  */
/* ====================================================== */

import { SET_USER_REGION, Region, setUserRegion } from '../../modules/user/user_module'

import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, TextInput, Button } from 'react-native'
import { Text } from '../../ui/components/text/text_component'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './onboarding_screens_styles'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { RegionSelectProps, RegionSelectDispatchProps, RegionSelectStateProps} from './onboarding_screens_interfaces'
import { Dispatch } from 'redux';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */


class RegionSelectionScreen extends Component<RegionSelectProps> {
    render() {
        return (
            <View>
                <Text>Before jumping right into the app we need to tell us from which region are you</Text>
                
            </View>
        )
    }
}

const mapStateToProps = (state: any): RegionSelectStateProps => ({
    fetchSetRegionStatus: getRequestStatus(state, {
		actionType: SET_USER_REGION.NAME
    })
})

const mapDispatchToProps = (dispatch: Dispatch): RegionSelectDispatchProps => ({
    handleSetRegion: (region: Region) => dispatch(setUserRegion(region))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegionSelectionScreen)
