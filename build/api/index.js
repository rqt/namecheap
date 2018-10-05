let getList = require('./domains/get-list'); if (getList && getList.__esModule) getList = getList.default;
let getInfo = require('./domains/get-info'); if (getInfo && getInfo.__esModule) getInfo = getInfo.default;
let check = require('./domains/check'); if (check && check.__esModule) check = check.default;
let create = require('./domains/create'); if (create && create.__esModule) create = create.default;

let getAddressList = require('./users/address/get-list'); if (getAddressList && getAddressList.__esModule) getAddressList = getAddressList.default;
let getAddressInfo = require('./users/address/get-info'); if (getAddressInfo && getAddressInfo.__esModule) getAddressInfo = getAddressInfo.default;

const domains = {
  /**
   * Returns a list of domains for the particular user.
   * @param {GetList} options Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx
 * @param {'ALL'|'EXPIRING'|'EXPIRED'} [options.type="ALL"] The type of domains. Default `ALL`.
 * @param {string} [options.filter] The keyword to look for in the domain list.
 * @param {number} [options.page=1] The page to return. Default `1`.
 * @param {number} [options.pageSize=20] The number of domains to be listed on a page. Minimum value is 10, and maximum value is 100. Default `20`.
 * @param {'name'|'expire'|'create'} [options.sort="create"] The field by which to sort domains. If not given, the domains are sorted in descending order by their creation date. Default `create`.
 * @param {boolean} [options.desc=false] Whether to sort in descending order. Default `false`.
   */
  async getList(options = {}) {
    /** @type {{domains: Domain[], TotalItems: number, CurrentPage: number, PageSize: number}} */
    const res = await getList(this._query.bind(this), options)
    return res
  },
  /**
   * Returns information about the requested domain.
 * @param {string|GetInfo} options The domain name, or options to get info about a domain.
 * @param {string} options.domain The domain to get info about.
   */
  async getInfo(options) {
    /** @type {DomainInfo} */
    const res = await getInfo(this._query.bind(this), options)
    return res
  },
  /**
   * Check if the domain name is taken.
 * @param {string|Check} options
 * @param {string} [options.domain] The domain check.
 * @param {string[]} [options.domains] The domains to check.
   */
  async check(options) {
    /** @type {DomainCheck[]} */
    const res = await check(this._query.bind(this), options)
    return res
  },
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
   */
  async create(options) {
    /** @type {RegistrationResult} */
    const res = await create(this._query.bind(this), options)
    return res
  },
}

const api = {
  domains,
  users: {
    address: {
      /**
       * Gets a list of address IDs and address names associated with the user account.
       */
      async getList() {
        /** @type {Address[]} */
        const res = await getAddressList(this._query.bind(this))
        return res
      },
      /**
       * Gets information for the requested address ID.
 * @param {string|number} id The address id to get info about.
       */
      async getInfo(id) {
        /** @type {AddressDetail} */
        const res = await getAddressInfo(this._query.bind(this), id)
        return res
      },
    },
  },
}

module.exports=api

/* documentary types/api/domains/check.xml */
/**
 * @typedef {Object} Check Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx
 * @prop {string} [domain] The domain check.
 * @prop {string[]} [domains] The domains to check.
 *
 * @typedef {Object} DomainCheck The result of the check.
 * @prop {string} Domain The domain name for which you wish to check availability.
 * @prop {boolean} Available Indicates whether the domain name is available for registration.
 * @prop {boolean} IsPremiumName Indicates whether the domain name is premium.
 * @prop {boolean} PremiumRegistrationPrice The registration price for the premium domain.
 * @prop {boolean} PremiumRenewalPrice The renewal price for the premium domain.
 * @prop {boolean} PremiumRestorePrice The restore price for the premium domain.
 * @prop {boolean} PremiumTransferPrice The transfer price for the premium domain.
 * @prop {number} EapFee Purchase fee for the premium domain during Early Access Program (EAP)*.
 * @prop {number} IcannFee Fee charged by ICANN.
 */

/* documentary types/api/domains/get-info.xml */
/**
 * @typedef {Object} GetInfo Options to get info about a domain. https://www.namecheap.com/support/api/methods/domains/get-info.aspx
 * @prop {string} domain The domain to get info about.
 * @prop {string} [host] The hosted domain name for which domain information needs to be requested.
 *
 * @typedef {Object} DomainInfo
 * @prop {string} DomainName Domain name for which the information was requested, e.g., `example.com`.
 * @prop {string} OwnerName User account under which the domain is registered, e.g., `rqt`.
 * @prop {number} ID Unique integer value that represents the domain,e.g., `314928`.
 * @prop {boolean} IsOwner Indicates whether the API user is the owner of the domain, e.g., `true`.
 * @prop {boolean} IsPremium Indicates whether the domain name is premium, e.g., `false`.
 * @prop {'Ok'|'Locked'|'Expired'} Status Indicates the status of the domain, e.g., `OK`.
 * @prop {DomainDetails} DomainDetails
 * @prop {LockDetails} LockDetails
 * @prop {Whoisguard} Whoisguard
 * @prop {PremiumDnsSubscription} PremiumDnsSubscription
 * @prop {DnsDetails} DnsDetails
 * @prop {ModificationRights} ModificationRights
 *
 * @typedef {Object} DomainDetails
 * @prop {string} CreatedDate `06/06/2018`
 * @prop {string} ExpiredDate `06/06/2019`
 * @prop {number} NumYears 1
 *
 * @typedef {Object} LockDetails
 *
 * @typedef {Object} Whoisguard
 * @prop {boolean} Enabled `true`
 * @prop {string} ID `264991`
 * @prop {string} ExpiredDate `06/06/2019`
 * @prop {EmailDetails} EmailDetails
 *
 * @typedef {Object} EmailDetails
 * @prop {number} AutoEmailChangeFrequencyDays `0`
 * @prop {string} ForwardedTo `example@adc.sh`
 * @prop {string} LastAutoEmailChangeDate
 * @prop {string} WhoisGuardEmail `43b596ee817f451f98eab1d848a4051a.protect@whoisguard.com`
 *
 * @typedef {Object} PremiumDnsSubscription
 * @prop {Date} CreatedDate
 * @prop {Date} ExpirationDate
 * @prop {boolean} IsActive `false`
 * @prop {number} SubscriptionId -1
 * @prop {boolean} UseAutoRenew `false`
 *
 * @typedef {Object} DnsDetails
 * @prop {boolean} DynamicDNSStatus `false`
 * @prop {string} EmailType `FWD`
 * @prop {number} HostCount `2`
 * @prop {boolean} IsFailover `false`
 * @prop {boolean} IsUsingOurDNS `true`
 * @prop {string[]} Nameserver `[dns1.registrar-servers.com, dns2.registrar-servers.com]`
 * @prop {'CUSTOM'|'FREE'} ProviderType `FREE`
 *
 * @typedef {Object} ModificationRights
 * @prop {boolean} All `true`
 * @prop {boolean} [hosts]
 */

/* documentary types/api/domains/get-list.xml */
/**
 * @typedef {Object} GetList Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx
 * @prop {'ALL'|'EXPIRING'|'EXPIRED'} [type="ALL"] The type of domains. Default `ALL`.
 * @prop {string} [filter] The keyword to look for in the domain list.
 * @prop {number} [page=1] The page to return. Default `1`.
 * @prop {number} [pageSize=20] The number of domains to be listed on a page. Minimum value is 10, and maximum value is 100. Default `20`.
 * @prop {'name'|'expire'|'create'} [sort="create"] The field by which to sort domains. If not given, the domains are sorted in descending order by their creation date. Default `create`.
 * @prop {boolean} [desc=false] Whether to sort in descending order. Default `false`.
 *
 * @typedef {Object} Domain
 * @prop {boolean} AutoRenew `false`
 * @prop {string} Created `07/23/2018`
 * @prop {string} Expires `07/23/2019`
 * @prop {number} ID `314928`
 * @prop {boolean} IsExpired `false`
 * @prop {boolean} IsLocked `false`
 * @prop {boolean} IsOurDNS `true`
 * @prop {boolean} IsPremium `false`
 * @prop {string} Name `domain.app`
 * @prop {string} User `user`
 * @prop {string} WhoisGuard `ENABLED`
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

/* documentary types/api/users/address/get-list.xml */
/**
 * @typedef {Object} Address
 * @prop {number} AddressId A unique integer value that represents the address profile.
 * @prop {number} AddressName The name of the address profile.
 * @prop {boolean} IsDefault Whether it is a default address.
 */
