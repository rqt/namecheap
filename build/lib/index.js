       const filterEmpty = (obj) => {
  return Object.keys(obj).reduce((acc, k) => {
    const val = obj[k]
    if (val === undefined) return acc
    acc[k] = val
    return acc
  }, {})
}

       const validateDomains = (arr) => arr.reduce((acc, current) => {
  return acc && typeof current == 'string'
}, true)

module.exports.filterEmpty = filterEmpty
module.exports.validateDomains = validateDomains