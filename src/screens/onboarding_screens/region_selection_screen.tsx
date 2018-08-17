import React, { Component } from 'react'
import { connect } from 'react-redux'
import routes from '../../routes'

/* ====================================================== */
/*                   Actions / Selectors                  */
/* ====================================================== */

import { SET_USER_REGION, Region, setUserRegion } from '../../modules/user/user_module'

import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, TextInput } from 'react-native'
import { Text } from '../../ui/components/text/text_component'
import { Button } from '../../ui/components/button/button_component'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './onboarding_screens_styles'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { RegionSelectProps, RegionSelectState, RegionSelectDispatchProps, RegionSelectStateProps} from './onboarding_screens_interfaces'
import { Dispatch } from 'redux';
import PickerComponent from '../../ui/components/picker/picker_component';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const REGION_OPTIONS = [
    {
        key: 'es',
        value: 'Spain'
    },
    {
        key: 'us',
        value: 'United States'
    }
]

class RegionSelectionScreen extends Component<RegionSelectProps,RegionSelectState> {

    state = {
        region: {
            key: 'us',
            value: 'United States'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text light style={styles.textPadding}>
                        Before jumping right into the app we need to know from which region are you
                    </Text>
                    <PickerComponent 
                        title="Region"
                        options={REGION_OPTIONS}
                        option={this.state.region.value}
                        onOptionSelected={(region) => this.setState({ region })}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        big
                        secondary
                        onPress={() => this.props.navigation.navigate(routes.welcome())}
                    >
                        Previous
                    </Button>
                    <Button
                        big
                        onPress={() => this.props.navigation.navigate(routes.enjoy())}
                    >
                        Next
                    </Button>
                </View>
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
