import React from 'react'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { TouchableOpacity, View } from 'react-native'

interface ownProps {
    fontSize: number,
    name: string, 
    onPress?: () => void
}

export default class Icon extends React.Component<ownProps> {

    constructor({ fontSize = 12, name = '', onPress } : ownProps) {
        super({ fontSize, name, onPress })
    }

    render() {
        const { fontSize, name, onPress } = this.props
        return (
            <TouchableOpacity onPress={onPress}>
                <FontAwesome style={{fontSize, textAlign: 'center'}}>{Icons[name]}</FontAwesome>
            </TouchableOpacity>
        )
    }
}
