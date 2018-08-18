import React, { ReactText } from 'react'
import classnames from '../../../lib/classnames'
import { Text as NativeText, TextStyle, RegisteredStyle } from 'react-native'
import _ from 'lodash'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './text_component_style'

/* ====================================================== */
/*                       Interfaces                       */
/* ====================================================== */

export interface TextProps {
	secondary?: boolean
	white?: boolean
	caps?: boolean
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
	style?: RegisteredStyle<TextStyle>
	children: string | ReactText[]
}

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export const Text: React.SFC<TextProps> = ({
	// Secondary
	secondary,
	white,
	// caps
	caps,
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
		[styles.secondary]: secondary,
		[styles.white]: white,
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

	return <NativeText style={classes}>{caps ? _.toUpper(children as string) : children}</NativeText>
}
