import extractTags from 'rexml'

const COMMAND = 'namecheap.users.address.getList'

/**
 * Gets a list of address IDs and address names associated with the user account.
 * @param {!Function} query
 * @example
 *
 * // Get the list of addresses added to the account.
 * await nc.address.getList()
 * // Result:
 * [
 *  {
 *    AddressId: 0,
 *    AddressName: 'Primary Address',
 *    IsDefault: true,
 *  }
 * ]
 */
async function getList(query) {
  const res = await query(COMMAND)
  const [{
    content: AddressGetListResult,
  }] = extractTags('AddressGetListResult', res)
  const List = extractTags('List', AddressGetListResult)
  const addresses = List.map(({ props }) => {
    /** @type {_namecheap.Address} */
    const a = props
    return a
  })
  return addresses
}

export default getList

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').Address} _namecheap.Address
 */
