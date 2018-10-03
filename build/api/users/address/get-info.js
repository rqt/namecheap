const { debuglog } = require('util');
let extractTags = require('rexml'); if (extractTags && extractTags.__esModule) extractTags = extractTags.default;

const LOG = debuglog('expensive')

const COMMAND = 'namecheap.users.address.getInfo'

/**
 * Gets information for the requested address ID.
 * @param {string|number} id The address id to get info about.
 * @example
 *
 * // Find the address info.
 * await nc.users.address.getInfo(0)
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
async function getInfo(id) {
  const res = await this._query(COMMAND, {
    AddressId: id,
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
  /** @type {AddressDetail} */
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

module.exports=getInfo

/* documentary types/api/users/address/get-info.xml */
/**
 * @typedef {Object} AddressDetail
 * @prop {string} FirstName
 * @prop {string} LastName
 * @prop {string} JobTitle
 * @prop {string} Organization
 * @prop {string} Address1
 * @prop {string} Address2
 * @prop {string} City
 * @prop {string} StateProvince
 * @prop {string} StateProvinceChoice
 * @prop {string} Zip
 * @prop {string} Country
 * @prop {string} Phone
 * @prop {string} PhoneExt
 * @prop {string} EmailAddress
 */
