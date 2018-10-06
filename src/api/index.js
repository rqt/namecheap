import getList from './domains/get-list'
import getInfo from './domains/get-info'
import check from './domains/check'
import create from './domains/create'

import getAddressList from './address/get-list'
import getAddressInfo from './address/get-info'
import getPricing from './users/get-pricing'

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
 * @param {string|GetInfo} options Options to get info about a domain. https://www.namecheap.com/support/api/methods/domains/get-info.aspx
 * @param {string} options.domain The domain to get info about.
 * @param {string} [options.host] The hosted domain name for which domain information needs to be requested.
   */
  async getInfo(options) {
    /** @type {DomainInfo} */
    const res = await getInfo(this._query.bind(this), options)
    return res
  },
  /**
   * Check if the domain name is taken.
 * @param {string|Check} options Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx
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
 * @param {AddressDetail} options.address A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.address.getList` and `namecheap.address.getInfo`.
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

const address = {
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
}

const users = {
  /**
   * Returns pricing information for a requested product type.
   * @param {GetPricing} options Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx
 * @param {'DOMAIN'|'SSLCERTIFICATE'|'WHOISGUARD'} options.type Product Type to get pricing information.
 * @param {string} [options.category] Specific category within a product type, e.g., `DOMAINS`, `COMODO`, `WHOISGUARD`.
 * @param {string} [options.promoCode] Promotional (coupon) code for the user.
 * @param {'REGISTER'|'PURCHASE'|'RENEW'|'REACTIVATE'|'TRANSFER'} [options.action] Specific action within a product type.
 * @param {string} [options.product] The name of the product within a product type, e.g., `COM`, `INSTANTSSL`, `WHOISGUARD-PROTECT-ONE`.
   */
  async getPricing(options) {
    /** @type {Pricing} */
    const res = await getPricing(this._query.bind(this), options)
    return res
  },
}

const api = {
  domains,
  address,
  users,
}

export default api

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

/* documentary types/api/address/get-info.xml */
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
 * @prop {AddressDetail} address A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.address.getList` and `namecheap.address.getInfo`.
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

/* documentary types/api/address/get-list.xml */
/**
 * @typedef {Object} Address
 * @prop {number} AddressId A unique integer value that represents the address profile.
 * @prop {number} AddressName The name of the address profile.
 * @prop {boolean} IsDefault Whether it is a default address.
 */

/* documentary types/api/users/get-pricing.xml */
/**
 * @typedef {Object} GetPricing Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx
 * @prop {'DOMAIN'|'SSLCERTIFICATE'|'WHOISGUARD'} type Product Type to get pricing information.
 * @prop {string} [category] Specific category within a product type, e.g., `DOMAINS`, `COMODO`, `WHOISGUARD`.
 * @prop {string} [promoCode] Promotional (coupon) code for the user.
 * @prop {'REGISTER'|'PURCHASE'|'RENEW'|'REACTIVATE'|'TRANSFER'} [action] Specific action within a product type.
 * @prop {string} [product] The name of the product within a product type, e.g., `COM`, `INSTANTSSL`, `WHOISGUARD-PROTECT-ONE`.
 *
 * @typedef {Object} Pricing The pricing information returned as an object. The data is split into 3 types: `Domain`, `SSL` and `Whois`.
 * @prop {DomainPricing} domain The pricing of domains.
 * @prop {SSLPricing} ssl The pricing of certificates.
 * @prop {WhoisPricing} whoisguard The pricing of the Whois Guard.
 *
 * @typedef {Object} DomainPricing The pricing of domains as an object, where the requested zone is a key.
 * @prop {Object.<string, Product>} register The pricing to register domains.
 * @prop {Object.<string, Product>} renew The pricing to renew domains.
 * @prop {Object.<string, Product>} reactivate The pricing to reactivate domains.
 * @prop {Object.<string, Product>} transfer The pricing to transfer domains.
 *
 * @typedef {Object} SSLPricing The pricing of certificates.
 * @prop {SSLPurchase} purchase The pricing to purchase certificates.
 * @prop {SSLRenew} renew The pricing to renew certificates.
 *
 * @typedef {Object} WhoisPricing The pricing of the Whois Guard.
 * @prop {WhoisPurchase} purchase The pricing to purchase WHOIS guards.
 * @prop {WhoisRenew} renew The pricing to renew WHOIS guards.
 *
 * @typedef {Price[]} Product A product consists of an array of prices for different durations.
 *
 * @typedef {Object} Price Price data for a product accoding to the duration of an action.
 * @prop {number} Duration The duration of the product, e.g., `1`.
 * @prop {string} DurationType The duration type of the product, e.g., `YEAR`.
 * @prop {string} Price Indicates Final price (it can be from regular, userprice, special price,promo price, tier price), e.g., `20.88`.
 * @prop {'MULTIPLE'} PricingType Always set to `MULTIPLE`.
 * @prop {string} [AdditionalCost] Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.
 * @prop {string} RegularPrice Indicates regular price, e.g., `39.00`.
 * @prop {'MULTIPLE'} RegularPriceType Always set to `MULTIPLE`.
 * @prop {string} [RegularAdditionalCost] Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.
 * @prop {'MULTIPLE'} [RegularAdditionalCostType] Always set to `MULTIPLE`.
 * @prop {string} YourPrice The user’s price for the product, e.g., `20.88`.
 * @prop {'MULTIPLE'} YourPriceType Always set to `MULTIPLE`.
 * @prop {string} [YourAdditonalCost] Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.
 * @prop {'MULTIPLE'} [YourAdditonalCostType] Always set to `MULTIPLE`.
 * @prop {string} PromotionPrice Price with coupon enabled.
 * @prop {string} Currency Currency in which the price is listed, e.g., `USD`.
 */

/* documentary types/api/users/pricing/ssl.xml */
/**
 * @typedef {Object} SSLPurchase The pricing to purchase certificates.
 * @prop {Product} instantssl _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year purchase: `20.88 USD`
 * @prop {Product} positivessl _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year purchase: `8.88 USD`
 * @prop {Product} positivesslWildcard _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year purchase: `76.88 USD`
 * @prop {Product} premiumssl _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year purchase: `79.00 USD`
 * @prop {Product} quicksslPremium 1-year purchase: `56.88 USD`
 * @prop {Product} rapidssl 1-year purchase: `10.95 USD`
 * @prop {Product} rapidsslWildcard 1-year purchase: `148.88 USD`
 * @prop {Product} secureSite 1-year purchase: `285.88 USD`
 * @prop {Product} secureSitePro 1-year purchase: `675.88 USD`
 * @prop {Product} secureSiteProWithEv 1-year purchase: `961.88 USD`
 * @prop {Product} secureSiteWithEv 1-year purchase: `666.88 USD`
 * @prop {Product} trueBusinessid 1-year purchase: `98.00 USD`
 * @prop {Product} trueBusinessidWildcard 1-year purchase: `389.00 USD`
 * @prop {Product} trueBusinessidWithEv 1-year purchase: `179.00 USD`
 * @prop {Product} premiumsslWildcard _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year purchase: `169.00 USD`
 * @prop {Product} essentialssl _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year purchase: `18.88 USD`
 * @prop {Product} essentialsslWildcard _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year purchase: `74.88 USD`
 * @prop {Product} evSsl _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year purchase: `78.88 USD`
 * @prop {Product} instantsslPro _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year purchase: `38.88 USD`
 * @prop {Product} ssl123 1-year purchase: `39.00 USD`
 * @prop {Product} sslWebServer 1-year purchase: `88.88 USD`
 * @prop {Product} sslWebserverEv 1-year purchase: `163.88 USD`
 * @prop {Product} comodossl 1-year purchase: `35.00 USD`
 * @prop {Product} comodosslWildcard 1-year purchase: `170.00 USD`
 * @prop {Product} comodosslMultiDomainSsl _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year purchase: `89.88 USD`
 * @prop {Product} comodosslMultiDomainSslMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} comodosslEvMultiDomainSsl _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year purchase: `168.88 USD`
 * @prop {Product} comodosslEvMultiDomainSslMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} positivesslMultiDomain _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year purchase: `29.88 USD`
 * @prop {Product} positivesslMultiDomainMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} trueBusinessidMultiDomain 1-year purchase: `179.88 USD`
 * @prop {Product} trueBusinessidMultiDomainMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} trueBusinessidWithEvMultiDomain 1-year purchase: `237.88 USD`
 * @prop {Product} trueBusinessidWithEvMultiDomainMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} unifiedCommunications _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year purchase: `89.88 USD`
 * @prop {Product} unifiedCommunicationsMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} secureSiteMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} quicksslPremiumMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} secureSiteProMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} secureSiteProWithEvMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} secureSiteWithEvMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} sgcSuperCertsMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} sslWebServerMoresans 1-year purchase: `0.00 USD`
 * @prop {Product} sslWebserverEvMoresans 1-year purchase: `0.00 USD`
 *
 * @typedef {Object} SSLRenew The pricing to renew certificates.
 * @prop {Product} instantssl _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year renewal: `31.98 USD`
 * @prop {Product} positivessl _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year renewal: `7.28 USD`
 * @prop {Product} positivesslWildcard _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year renewal: `77.08 USD`
 * @prop {Product} premiumssl _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year renewal: `64.78 USD`
 * @prop {Product} quicksslPremium 1-year renewal: `46.64 USD`
 * @prop {Product} rapidssl 1-year renewal: `8.98 USD`
 * @prop {Product} rapidsslWildcard 1-year renewal: `122.08 USD`
 * @prop {Product} secureSite 1-year renewal: `234.42 USD`
 * @prop {Product} secureSitePro 1-year renewal: `554.22 USD`
 * @prop {Product} secureSiteProWithEv 1-year renewal: `788.74 USD`
 * @prop {Product} secureSiteWithEv 1-year renewal: `546.84 USD`
 * @prop {Product} trueBusinessid 1-year renewal: `80.36 USD`
 * @prop {Product} trueBusinessidWildcard 1-year renewal: `318.98 USD`
 * @prop {Product} trueBusinessidWithEv 1-year renewal: `146.78 USD`
 * @prop {Product} ssl123 1-year renewal: `31.98 USD`
 * @prop {Product} sslWebServer 1-year renewal: `72.88 USD`
 * @prop {Product} sslWebserverEv 1-year renewal: `134.38 USD`
 * @prop {Product} essentialssl _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year renewal: `18.88 USD`
 * @prop {Product} essentialsslWildcard _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year renewal: `74.88 USD`
 * @prop {Product} evSsl _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year renewal: `118.90 USD`
 * @prop {Product} instantsslPro _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year renewal: `48.38 USD`
 * @prop {Product} premiumsslWildcard _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year renewal: `138.58 USD`
 * @prop {Product} comodossl 1-year renewal: `28.70 USD`
 * @prop {Product} comodosslMultiDomainSsl _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year renewal: `73.70 USD`
 * @prop {Product} comodosslEvMultiDomainSsl _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year renewal: `203.26 USD`
 * @prop {Product} positivesslMultiDomain _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year renewal: `24.50 USD`
 * @prop {Product} trueBusinessidMultiDomain 1-year renewal: `147.50 USD`
 * @prop {Product} trueBusinessidWithEvMultiDomain 1-year renewal: `195.06 USD`
 * @prop {Product} unifiedCommunications _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year renewal: `73.70 USD`
 */

/* documentary types/api/users/pricing/whois.xml */
/**
 * @typedef {Object} WhoisPurchase The pricing to purchase WHOIS guards.
 * @prop {Product} whoisguard5Pack 1-year purchase: `7.88 USD`
 * @prop {Product} whoisguardDualPack 1-year purchase: `4.88 USD`
 * @prop {Product} whoisguardProtectOne 1-year purchase: `0.00 USD`
 *
 * @typedef {Object} WhoisRenew The pricing to renew WHOIS guards.
 * @prop {Product} whoisguardProtectOne 1-year renewal: `0.00 USD`
 */
