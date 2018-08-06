import { Dimensions } from 'react-native'

export const { height, width } = Dimensions.get('window')

export const searchBookWidth = width * 1/2
export const searchBookHeight = height
// Book image ratio 0,625 = 5/8
const imageRatio = 5/8
const imageScreenRatio = 1/4
export const bookHeight = width * imageScreenRatio * (1/imageRatio)
export const bookWidth = width * imageScreenRatio