let extractTags = require('rexml'); if (extractTags && extractTags.__esModule) extractTags = extractTags.default;

const COMMAND = 'namecheap.users.address.getList'

/**
 * Gets a list of address IDs and address names associated with the user account.
 * @param {Function} query
 * @example
 *
 * // Get the list of addresses added to the account.
 * await nc.users.address.getList()
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
    /** @type {Address} */
    const a = props
    return a
  })
  return addresses
}

module.exports=getList

/* documentary types/api/users/address/get-list.xml */
/**
 * @typedef {Object} Address
 * @prop {number} AddressId A unique integer value that represents the address profile.
 * @prop {number} AddressName The name of the address profile.
 * @prop {boolean} IsDefault Whether it is a default address.
 */
