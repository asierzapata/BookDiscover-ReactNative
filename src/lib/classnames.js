import _ from 'lodash'

const classnames = (classes, conditions) => {
	let styles = [classes]
	_.forEach(conditions, (c, key) => (c ? styles.push(_.toInteger(key)) : null))
	return styles
}

export default classnames
