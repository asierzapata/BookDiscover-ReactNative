import React, { Component } from 'react'
import { Text, View, Picker } from 'react-native'
import _ from 'lodash'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState } from './advanced_search_card_interfaces';

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './advanced_search_card_styles'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default class AdvancedSearchCard extends Component<ownProps,ownState> {
    render() {
        const { title, items, value, onValueChange} = this.props
        return (
            <View style={styles.advancedSearchRow}>
                <Text style={styles.title}>{title}</Text>
                <Picker
                    selectedValue={value}
                    onValueChange={onValueChange}
                    itemStyle={styles.advancedSearchPicker}
                >
                    {_.map(items, (display, field) => 
                        <Picker.Item label={display} value={field} key={field}/>
                    )}
                </Picker>
            </View>
        )
    }
}