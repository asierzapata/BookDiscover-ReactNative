export default function selectorCreatorFactory(selectorNamespace) {
  return function createSelector(selector) {
    return (globalState, ...args) => {
      return selector(globalState[selectorNamespace], ...args)
    }
  }
}
