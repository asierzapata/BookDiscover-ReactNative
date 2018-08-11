import { Dimensions } from 'react-native'

const TABLET_BREAKPOINT = 450

export const { height, width } = Dimensions.get('window')

export const searchBookWidth = width * 1/2
export const searchBookHeight = height
// Book image ratio 0,625 = 5/8
const imageRatio = 5/8
const imageScreenRatio = _isTablet(width) ? 1/5 : 1/4
export const bookHeight = width * imageScreenRatio * (1/imageRatio)
export const bookWidth = width * imageScreenRatio
export const gestureModalResponseDistance = height * 2/3

function _isTablet(width: number) {
    return width >= TABLET_BREAKPOINT
}