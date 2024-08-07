import React from "react"

/**
 * Handles setting callback refs and MutableRefObjects.
 * @param ref The ref to use for the instance.
 * @param instance The instance being set.
 */
function setRef<T>(ref: React.Ref<T>, instance: T) {
  if (ref instanceof Function) {
    ref(instance)
  } else if (ref) {
    ;(ref as React.MutableRefObject<T>).current = instance
  }
}

export function combinedRef<T>(refs: React.Ref<T>[]) {
  return (instance: T | null) => refs.forEach((ref) => setRef(ref, instance))
}

// CREDIT https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/composeRefs.tsx
/**
 * Create a ref that passes its instance to multiple refs.
 * @param refs The refs that should receive the instance.
 * @returns The combined ref.
 */
export function useMultipleRefs<T>(...refs: React.Ref<T>[]) {
  return React.useCallback(combinedRef(refs), [refs])
}
