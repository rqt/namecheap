import { debuglog } from 'util'
import extractTags from 'rexml'

const LOG = debuglog('expensive')

const COMMAND = 'namecheap.users.address.getInfo'

/**
 * Gets information for the requested address ID.
 * @param {!Function} query
 * @param {string|number} id The address id to get info about.
 * @example
 *
 * // Find the address info.
 * await nc.address.getInfo(0)
 *
 * // Result:
 * { AddressId: 0,
 *  UserName: 'example',
 *  AddressName: 'Main Address',
 *  Default_YN: true,
 *  FirstName: 'Art',
 *  LastName: 'Deco',
 *  JobTitle: 'Developer',
 *  Organization: 'Example Co Limited',
 *  Address1: 'Planetary Express',
 *  Address2: '57th Street',
 *  City: 'New New York',
 *  StateProvince: 'NA',
 *  StateProvinceChoice: 'P',
 *  Zip: '10019',
 *  Country: 'US',
 *  Phone: '+1.5417543010',
 *  PhoneExt: '',
 *  EmailAddress: 'artdeco[at]adc.sh' }
 */
async function getInfo(query, id) {
  const res = await query(COMMAND, {
    'AddressId': id,
  })
  const [{
    content: GetAddressInfoResult,
  }] = extractTags('GetAddressInfoResult', res)
  const address = parse(GetAddressInfoResult)
  return address
}

const keys = [
  'AddressId', 'UserName', 'AddressName', 'Default_YN',
  'FirstName', 'LastName', 'JobTitle', 'Organization', 'Address1', 'Address2',
  'City', 'StateProvince', 'StateProvinceChoice', 'Zip', 'Country', 'Phone',
  'PhoneExt', 'EmailAddress',
]

const parse = (add) => {
  /** @type {!_namecheap.AddressDetail} */
  const res = keys
    .reduce((acc, key) => {
      try {
        let [{ content }] = extractTags(key, add)
        if (key == 'Default_YN') {
          content = content == 'true'
        } else if (key == 'AddressId') {
          content = parseInt(content, 10)
        }
        return {
          ...acc,
          [key]: content,
        }
      } catch (er) {
        LOG(`Could not extract tag ${key}`)
        return acc
      }
    }, {})
  return res
}

export default getInfo

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/typedefs/address').AddressDetail} _namecheap.AddressDetail
 */