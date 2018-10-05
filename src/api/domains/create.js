import extractTags from 'rexml'

const COMMAND = 'namecheap.domains.create'

/**
 * Register a domain.
 * @param {Create} options Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx
 * @param {string} options.domain The domain name to register.
 * @param {number} [options.years=1] The number of years to register. Default `1`.
 * @param {string} [options.promo] Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.
 * @param {string[]} [options.nameservers] The comma-separated list of custom nameservers to be associated with the domain name.
 * @param {boolean} [options.whois=true] Adds free WhoisGuard for the domain. Default `true`.
 * @param {AddressDetail} options.address A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.users.address.getList` and `namecheap.users.address.getInfo`.
 * @param {AddressDetail} [options.billingAddress] An address to use for `AuxBilling` address details.
 * @param {AddressDetail} [options.registrantAddress] An address to use for `Registrant` address details.
 * @param {AddressDetail} [options.techAddress] An address to use for `Tech` address details.
 * @param {AddressDetail} [options.adminAddress] An address to use for `Admin` address details.
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
 * @param {string} address.EmailAddress Email address of the user.
 * @param {string} address.FirstName First name of the user.
 * @param {string} address.LastName Last name of the user.
 * @param {string} [address.JobTitle] Job designation of the user
 * @param {string} [address.Organization] Organization of the user.
 * @param {string} address.Address1 StreetAddress1 of the user.
 * @param {string} [address.Address2] StreetAddress2 of the user.
 * @param {string} address.City City of the user.
 * @param {string} address.StateProvince State/Province of the user.
 * @param {'S'|'P'} address.StateProvinceChoice State/Province choice of the user.
 * @param {string} address.Zip Zip/Postal code of the user.
 * @param {string} address.Country Two letter country code of the user.
 * @param {string} address.Phone Phone number in the format `+NNN.NNNNNNNNNN`.
 * @param {string} [address.PhoneExt] PhoneExt of the user.
 * @param {string} [address.Fax] Fax number in the format `+NNN.NNNNNNNNNN`.
 */
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

/* documentary types/api/domains/create.xml */
/**
 * @typedef {Object} Create Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx
 * @prop {string} domain The domain name to register.
 * @prop {number} [years=1] The number of years to register. Default `1`.
 * @prop {string} [promo] Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.
 * @prop {string[]} [nameservers] The comma-separated list of custom nameservers to be associated with the domain name.
 * @prop {boolean} [whois=true] Adds free WhoisGuard for the domain. Default `true`.
 * @prop {AddressDetail} address A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.users.address.getList` and `namecheap.users.address.getInfo`.
 * @prop {AddressDetail} [billingAddress] An address to use for `AuxBilling` address details.
 * @prop {AddressDetail} [registrantAddress] An address to use for `Registrant` address details.
 * @prop {AddressDetail} [techAddress] An address to use for `Tech` address details.
 * @prop {AddressDetail} [adminAddress] An address to use for `Admin` address details.
 *
 * @typedef {Object} RegistrationResult Registered domain information.
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
 * @prop {string} EmailAddress Email address of the user.
 * @prop {string} FirstName First name of the user.
 * @prop {string} LastName Last name of the user.
 * @prop {string} [JobTitle] Job designation of the user
 * @prop {string} [Organization] Organization of the user.
 * @prop {string} Address1 StreetAddress1 of the user.
 * @prop {string} [Address2] StreetAddress2 of the user.
 * @prop {string} City City of the user.
 * @prop {string} StateProvince State/Province of the user.
 * @prop {'S'|'P'} StateProvinceChoice State/Province choice of the user.
 * @prop {string} Zip Zip/Postal code of the user.
 * @prop {string} Country Two letter country code of the user.
 * @prop {string} Phone Phone number in the format `+NNN.NNNNNNNNNN`.
 * @prop {string} [PhoneExt] PhoneExt of the user.
 * @prop {string} [Fax] Fax number in the format `+NNN.NNNNNNNNNN`.
 */
