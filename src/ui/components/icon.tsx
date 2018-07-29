import React from 'react'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { TouchableOpacity } from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import { TextColor } from '../styles/colors'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

interface ownProps {
    fontSize?: number,
    textColor?: string,
    name: string, 
    onPress?: () => void
}

export default class Icon extends React.Component<ownProps> {

    constructor(props : ownProps) {
        super(props)
    }

    render() {
        const { fontSize = 12, textColor = TextColor, name = '', onPress } = this.props

        if (!onPress) {
            return (
                <FontAwesome 
                    style={{
                        fontSize, 
                        textAlign: 'center',
                        color: textColor
                    }}
                >
                    {Icons[name]}
                </FontAwesome>
            )
        }
        
        return (
            <TouchableOpacity onPress={onPress}>
                <FontAwesome 
                    style={{
                        fontSize, 
                        textAlign: 'center',
                        color: textColor
                    }}
                >
                    {Icons[name]}
                </FontAwesome>
            </TouchableOpacity>
        )
    }
}
