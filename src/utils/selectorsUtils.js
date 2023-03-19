import { createSelectorCreator } from 'reselect'
import shallowEqual from 'shallowequal'

function defaultEqualityCheck(currentVal, previousVal) {
  return currentVal === previousVal
}

function resultCheckMemoize(
  func,
  resultCheck = defaultEqualityCheck,
  argsCheck = defaultEqualityCheck
) {
  let lastArgs = null
  let lastResult = null
  return (...args) => {
    if (
      (lastArgs !== null &&
      lastArgs.length === args.length &&
      args.every((value, index) => argsCheck(value, lastArgs[index])))
    ) {
      return lastResult
    }

    lastArgs = args
    const result = func(...args)
    const sameResult = resultCheck(lastResult, result)
    return sameResult ? lastResult : (lastResult = result)
  }
}

export const createArraySelector = createSelectorCreator(
  resultCheckMemoize,
  (el1, el2) => {
    if(el1?.equals && el2?.equals){
      return el1.equals(el2)
    } else {
      //console.log(el1, el2, shallowEqual(el1, el2))
      return shallowEqual(el1, el2)
    }
  }
)
