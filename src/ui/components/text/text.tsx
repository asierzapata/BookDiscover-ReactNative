import React from 'react'
import classnames from '../../../helpers/classnames'
import { Text as NativeText } from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './text_style'

/* ====================================================== */
/*                       Interfaces                       */
/* ====================================================== */

export interface TextInterface {
	italic?: boolean
	light?: boolean
	bold?: boolean
	caption?: boolean
	subtitle?: boolean
	title?: boolean
	bigTitle?: boolean
	display?: boolean
	children?: string
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
	bold,
	// font size
	caption,
	subtitle,
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
		[styles.bold]: bold,
		[styles.caption]: caption,
		[styles.subtitle]: subtitle,
		[styles.title]: title,
		[styles.bigTitle]: bigTitle,
		[styles.display]: display
	})
	if (style) classes.push(style)

	return <NativeText style={classes}>{children}</NativeText>
}
