import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, Text } from 'react-native'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class libraryScene extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <View>
                <Text>Library</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(libraryScene)
