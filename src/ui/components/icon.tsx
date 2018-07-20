import React from 'react'
import FontAwesome, { Icons } from 'react-native-fontawesome';

const Icon = ({ name = '', fontSize = 12 }) => {
    return (
        <FontAwesome style={{fontSize, textAlign: 'center'}}>{Icons[name]}</FontAwesome>
    )
}

export default Icon