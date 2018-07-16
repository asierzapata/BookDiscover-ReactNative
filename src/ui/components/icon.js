import React from 'react'
import { string, number } from 'prop-types'
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default Icon = ({ name, fontSize = 12 }) => {
    return (
        <FontAwesome style={{fontSize, textAlign: 'center'}}>{Icons[name]}</FontAwesome>
    )
}

Icon.propTypes = {
    name: string.isRequired,
    fontSize: number
}