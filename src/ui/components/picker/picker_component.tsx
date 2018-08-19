import React, { Component } from 'react'
import _ from 'lodash'

import IconNames from '../../styles/icons'

import { View, TouchableOpacity, Modal } from 'react-native';
import { Text } from '../text/text_component'
import Icon from '../icon'

import styles from './picker_component_style'

export default class PickerComponent extends Component<OwnProps, OwnState> {

	state = {
		isOpen: false
	}

	render() {
		const { title, options, option, onOptionSelected } = this.props
		const { isOpen } = this.state
		return (
			<View>
				<Text subTitle bold style={styles.modalTitle}>{title}</Text>
				<TouchableOpacity onPress={() => this.setState({ isOpen: true })}>
					<Text semiBold secondary style={styles.optionSelectedText}>{option}</Text>
				</TouchableOpacity>
				<Modal
					animationType='fade'
					transparent={true}
					visible={isOpen}
				>
					<View style={styles.modal}>
						<View style={styles.modalContent}>
							<View style={styles.modalClose}>
								<Icon
									onPress={() => this.setState({ isOpen: false })}
									name={IconNames.CLOSE}
									fontSize={17}
									align='right'
								/>
							</View>
							<View style={styles.modalOptions}>
								{_.map(options, ({ value, key }) =>
									<View key={key}>
										<View style={styles.modalOption}>
											<TouchableOpacity
												onPress={() => this.setState({ isOpen: false }, () => onOptionSelected({ value, key }))}
												hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
											>
												<Text semiBold>{value}</Text>
											</TouchableOpacity>
										</View>
										<View style={styles.modalOptionsSeparator}/>
									</View>
								)}
							</View>
						</View>
					</View>
				</Modal>
			</View>
		)
	}
}

interface OwnState {
	isOpen: boolean
}

interface OwnProps {
	title: string
	options: Array<{
		key: string
		value: any
	}>
	option: string
	onOptionSelected: ({ value, key }: { value: any, key: any }) => void
}