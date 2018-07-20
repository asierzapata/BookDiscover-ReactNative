interface globalState {
  [key: string]: any
}

export default function selectorCreatorFactory(selectorNamespace: string) {
  return function createSelector(selector: (globalState: globalState, ...args: Array<any>) => any) {
    return (globalState: globalState, ...args: Array<any>) => {
      return selector(globalState[selectorNamespace], ...args)
    }
  }
}
