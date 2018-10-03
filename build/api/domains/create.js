let extractTags = require('rexml'); if (extractTags && extractTags.__esModule) extractTags = extractTags.default;

const COMMAND = 'namecheap.domains.create'

/**
 * Register a domain.
 * @param {Create} options Options to register a domain.
 * @param {string} options.domain The domain name to register.
 * @param {number} [options.years=1] The number of years to register. Default `1`.
 * @param {string} [options.promo] Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.
 * @param {string[]} [options.nameservers] The comma-separated list of custom nameservers to be associated with the domain name.
 * @param {boolean} [options.whois=true] Adds free WhoisGuard for the domain. Default `true`.
 * @param {AddressDetail} options.address A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.users.address.getList` and `namecheap.users.address.getInfo`.
 * @param {AddressDetail} [options.billingAddress] An address to use for `AuxBilling` address details.
 * @param {AddressDetail} [options.registrantAddress] An address to use for `Registrant` address details.
 * @param {AddressDetail} [options.techAddress] An address to use for `Tech` address details.
 * @param {Admin} [options.adminAddress] An address to use for `Admin` address details.
 * @example
 *
 * // 0. Find the default account address.
 * const ad = await nc.users.address.getList()
 * const { AddressId } = ad.find(({ IsDefault }) => IsDefault)
 * const address = await nc.users.address.getInfo(AddressId)
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
async function create(options) {
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

  const res = await this._query(COMMAND, {
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

/**
 * @param {AddressDetail} address
 * @param {string} address.FirstName
 * @param {string} address.LastName
 * @param {string} address.JobTitle
 * @param {string} address.Organization
 * @param {string} address.Address1
 * @param {string} address.Address2
 * @param {string} address.City
 * @param {string} address.StateProvince
 * @param {string} address.StateProvinceChoice
 * @param {string} address.Zip
 * @param {string} address.Country
 * @param {string} address.Phone
 * @param {string} address.PhoneExt
 * @param {string} address.EmailAddress
 */
       const getAddressObject = (address, key) => {
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

module.exports=create

/* documentary types/api/domains/create.xml */
/**
 * @typedef {Object} Create Options to register a domain.
 * @prop {string} domain The domain name to register.
 * @prop {number} [years=1] The number of years to register. Default `1`.
 * @prop {string} [promo] Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.
 * @prop {string[]} [nameservers] The comma-separated list of custom nameservers to be associated with the domain name.
 * @prop {boolean} [whois=true] Adds free WhoisGuard for the domain. Default `true`.
 * @prop {AddressDetail} address A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.users.address.getList` and `namecheap.users.address.getInfo`.
 * @prop {AddressDetail} [billingAddress] An address to use for `AuxBilling` address details.
 * @prop {AddressDetail} [registrantAddress] An address to use for `Registrant` address details.
 * @prop {AddressDetail} [techAddress] An address to use for `Tech` address details.
 * @prop {Admin} [adminAddress] An address to use for `Admin` address details.
 *
 * @typedef {Object} RegistrationResult
 * @prop {string} ChargedAmount Total amount charged for registration.
 * @prop {string} Domain Domain name that you are trying to register.
 * @prop {number} DomainID Unique integer value that represents the domain.
 * @prop {boolean} NonRealTimeDomain Indicates whether the domain registration is instant (real-time) or not.
 * @prop {number} OrderID Unique integer value that represents the order.
 * @prop {boolean} Registered Indicates whether the domain was registered.
 * @prop {number} TransactionID Unique integer value that represents the transaction.
 * @prop {boolean} WhoisguardEnable Indicates whether WhoisGuard protection is enabled for the domain.
 */

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


module.exports.getAddressObject = getAddressObject