export function mergeClassNames(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}
