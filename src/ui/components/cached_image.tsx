import React, { Component } from 'react'
import { LayoutAnimation, View, Image, StyleSheet } from 'react-native'
import CacheManager from '../../lib/cache/cache_image_manager'

interface ownProps {
    style?: any,
    containerStyle?: any,
    placeholderStyle?: any,
    source: string,
    onLoad?: () => void
}

interface ownState {
    uri?: string,
    isLoaded: boolean
}

class CachedImage extends Component<ownProps,ownState> {
    constructor(props: ownProps) {
        super(props)
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        this.load()
    }

    async load(): Promise<void> {
        const uri = this.props.source
        if (uri) {
            const path = await CacheManager.get(uri).getPath()
            this.setState({ uri: path })
            this.handleOnLoad()
        }
    }

    handleOnLoad = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
        this.setState({ isLoaded: true })
        if(this.props.onLoad) this.props.onLoad()
    }

    render() {
        const { style, containerStyle, placeholderStyle } = this.props
        const { isLoaded, uri } = this.state

        const imageStyle = isLoaded ? style : styles.notLoaded
        const viewStyle = containerStyle ? containerStyle : styles.containerDefault

        if(!isLoaded) return <View style={placeholderStyle} />

        return (
            <View style={viewStyle}>
                <Image
                    style={imageStyle}
                    source={{ uri }}
                    onLoad={this.handleOnLoad}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    notLoaded: {
        height: 1,
        width: 1,
    },
    containerDefault: {
        flex: 1
    }
})

export default CachedImage
