import React, { Component } from 'react'
import _ from 'lodash'

/* ====================================================== */
/*                      Components                        */
/* ====================================================== */

import { View } from 'react-native'
import PickerComponent from '../../../../ui/components/picker/picker_component'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { OwnProps, OwnState } from './advanced_search_card_interfaces'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './advanced_search_card_styles'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default class AdvancedSearchCard extends Component<OwnProps,OwnState> {
    render() {
        const { title, items, value, onValueChange} = this.props
        return (
            <View style={styles.advancedSearchRow}>
                <PickerComponent
						title={title}
						options={items}
						option={value}
						onOptionSelected={onValueChange}
					/>
            </View>
        )
    }
}