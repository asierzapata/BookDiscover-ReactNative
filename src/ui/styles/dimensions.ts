import { Dimensions } from 'react-native'

const TABLET_BREAKPOINT = 450

export const { height, width } = Dimensions.get('window')

export const searchBookWidth = (width * 1) / 2
export const searchBookHeight = height
export const unit025 = height / 40
export const unit05 = height / 20
export const unit = height / 10
export const unit2 = height / 5
export const unit3 = (height / 10) * 3
// Book image ratio 0,625 = 5/8
const imageRatio = 5 / 8
const imageScreenRatio = _isTablet(width) ? 1 / 5 : 1 / 4
export const bookHeight = width * imageScreenRatio * (1 / imageRatio)
export const bookWidth = width * imageScreenRatio
export const gestureModalResponseDistance = (height * 2) / 3

function _isTablet(width: number) {
	return width >= TABLET_BREAKPOINT
}

export const FONT_SIZES = {
	caption: 12,
	bigCaption: 14,
	body: 17,
	subTitle: 20,
	title: 24,
	bigTitle: 36,
	display: 54
}
