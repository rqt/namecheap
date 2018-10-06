import extractTags from 'rexml'

const COMMAND = 'namecheap.domains.create'

/**
 * Register a domain.
 * @param {Function} query
 * @param {Create} options Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx
 * @param {string} options.domain The domain name to register.
 * @param {number} [options.years=1] The number of years to register. Default `1`.
 * @param {string} [options.promo] Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.
 * @param {string[]} [options.nameservers] The comma-separated list of custom nameservers to be associated with the domain name.
 * @param {boolean} [options.whois=true] Adds free WhoisGuard for the domain. Default `true`.
 * @param {AddressDetail} options.address A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.address.getList` and `namecheap.address.getInfo`.
 * @param {AddressDetail} [options.billingAddress] An address to use for `AuxBilling` address details.
 * @param {AddressDetail} [options.registrantAddress] An address to use for `Registrant` address details.
 * @param {AddressDetail} [options.techAddress] An address to use for `Tech` address details.
 * @param {AddressDetail} [options.adminAddress] An address to use for `Admin` address details.
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