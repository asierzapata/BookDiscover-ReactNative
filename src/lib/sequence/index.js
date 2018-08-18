import PromisesQueue from 'p-queue'
import _ from 'lodash'

export default function sequence(promises, { concurrency = 1, autoStart }) {
	const queue = new PromisesQueue({ concurrency, autoStart })

	_.map(promises, promise => queue.add(promise))
	return queue.onIdle()
}

/* ====================================================== */
/*                       Public API                       */
/* ====================================================== */

export * from 'p-queue'