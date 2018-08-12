import React from 'react'
import classnames from '../../../lib/classnames'
import { Text as NativeText } from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './text_component_style'

/* ====================================================== */
/*                       Interfaces                       */
/* ====================================================== */

export interface TextInterface {
	italic?: boolean
	light?: boolean
	bold?: boolean
	semiBold?: boolean
	caption?: boolean
	bigCaption?: boolean
	subTitle?: boolean
	title?: boolean
	bigTitle?: boolean
	display?: boolean
	children?: any
	style?: number
}

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export const Text: React.SFC<TextInterface> = ({
	// font style
	italic,
	// font weight
	light,
	semiBold,
	bold,
	// font size
	caption,
	bigCaption,
	subTitle,
	title,
	bigTitle,
	display,
	// Children
	children,
	// style
	style
}) => {
	const classes = classnames(styles.baseText, {
		[styles.italic]: italic,
		[styles.light]: light,
		[styles.semiBold]: semiBold,
		[styles.bold]: bold,
		[styles.caption]: caption,
		[styles.bigCaption]: bigCaption,
		[styles.subTitle]: subTitle,
		[styles.title]: title,
		[styles.bigTitle]: bigTitle,
		[styles.display]: display
	})
	if (style) classes.push(style)

	return <NativeText style={classes}>{children}</NativeText>
}
