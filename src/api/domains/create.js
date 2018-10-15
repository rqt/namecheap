import extractTags from 'rexml'

const COMMAND = 'namecheap.domains.create'

/**
 * Register a domain.
 * @param {Function} query
 * @param {import('../index').Create} options
 * @example
 *
 * // 0. Find the default account address.
 * const ad = await nc.address.getList()
 * const { AddressId } = ad.find(({ IsDefault }) => IsDefault)
 * const address = await nc.address.getInfo(AddressId)
 *
 * // Register a domain.
 * await nc.domains.create({
 *  domain: 'example-test-100.com',
 *  address,
 * })
 * // Result:
 * { Domain: 'example-test-100.com',
 *  Registered: true,
 *  ChargedAmount: '9.0600',
 *  DomainID: 330037,
 *  OrderID: 1291740,
 *  TransactionID: 1828960,
 *  WhoisguardEnable: true,
 *  FreePositiveSSL: false,
 *  NonRealTimeDomain: false }
 */
async function create(query, options) {
  const {
    domain,
    years = 1,
    promo,
    address,
    registrantAddress = address,
    techAddress = address,
    adminAddress = address,
    billingAddress = address,
    nameservers = [],
    whois = true,
    premium = {},
  } = options
  const RegistrantAddress = getAddressObject(registrantAddress, 'Registrant')
  const TechAddress = getAddressObject(techAddress, 'Tech')
  const AdminAddress = getAddressObject(adminAddress, 'Admin')
  const AuxAddress = getAddressObject(billingAddress, 'AuxBilling')

  const res = await query(COMMAND, {
    DomainName: domain,
    Years: years,
    PromotionCode: promo,
    ...RegistrantAddress,
    ...TechAddress,
    ...AdminAddress,
    ...AuxAddress,
    Nameservers: nameservers.join(','),
    AddFreeWhoisguard: whois ? 'yes' : 'no',
    WGEnabled: whois ? 'yes' : 'no',
    ...premium,
  }, 'POST')
  const [{ props }] = extractTags('DomainCreateResult', res)
  /** @type {RegistrationResult} */
  const r = props
  return r
}

const keys = ['JobTitle', 'FirstName', 'LastName', 'Address1', 'Address2',
  'City', 'StateProvince', 'StateProvinceChoice', 'Country',
  'Phone', 'PhoneExt', 'Fax', 'EmailAddress']

export const getAddressObject = (address, key) => {
  const res = keys
    .reduce((acc, current) => {
      const val = (current == 'StateProvince' && !address[current]) ? 'NA' : address[current]
      return {
        ...acc,
        [`${key}${current}`]: val,
      }
    }, {
      [`${key}OrganizationName`]: address.Organization,
      [`${key}PostalCode`]: address.Zip,
    })
  return res
}

export default create