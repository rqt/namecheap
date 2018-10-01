export const filterEmpty = (obj) => {
  return Object.keys(obj).reduce((acc, k) => {
    const val = obj[k]
    if (val === undefined) return acc
    acc[k] = val
    return acc
  }, {})
}