/**
 * @fileoverview
 * @externs
 */

/* typal types/api/users/get-pricing.xml externs */
/** @const */
var _namecheap = {}
/**
 * Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx
 * @typedef {{ type: string, category: (string|undefined), promoCode: (string|undefined), action: (string|undefined), product: (string|undefined) }}
 */
_namecheap.GetPricing
/**
 * The pricing information returned as an object. The data is split into 3 types: `Domain`, `SSL` and `Whois`.
 * @typedef {{ domains: _namecheap.DomainPricing, ssl: _namecheap.SSLPricing, whoisguard: _namecheap.WhoisPricing }}
 */
_namecheap.Pricing
/**
 * The pricing of domains as an object, where the requested zone is a key.
 * @typedef {{ register: Object<string, _namecheap.Product>, renew: Object<string, _namecheap.Product>, reactivate: Object<string, _namecheap.Product>, transfer: Object<string, _namecheap.Product> }}
 */
_namecheap.DomainPricing
/**
 * The pricing of certificates.
 * @typedef {{ purchase: _namecheap.SSLPurchase, renew: _namecheap.SSLRenew }}
 */
_namecheap.SSLPricing
/**
 * The pricing of the Whois Guard.
 * @typedef {{ purchase: _namecheap.WhoisPurchase, renew: _namecheap.WhoisRenew }}
 */
_namecheap.WhoisPricing
/**
 * A product consists of an array of prices for different durations.
 * @typedef {!Array<!_namecheap.Price>}
 */
_namecheap.Product
/**
 * Price data for a product accoding to the duration of an action.
 * @typedef {{ Duration: number, DurationType: string, Price: string, PricingType: string, AdditionalCost: (string|undefined), RegularPrice: string, RegularPriceType: string, RegularAdditionalCost: (string|undefined), RegularAdditionalCostType: (string|undefined), YourPrice: string, YourPriceType: string, YourAdditonalCost: (string|undefined), YourAdditonalCostType: (string|undefined), PromotionPrice: string, Currency: string }}
 */
_namecheap.Price

/* typal types/api/users/pricing/ssl.xml externs */
/**
 * The pricing to purchase certificates.
 * @record
 */
_namecheap.SSLPurchase
/**
 * _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year purchase: `20.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.instantssl
/**
 * _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year purchase: `8.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.positivessl
/**
 * _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year purchase: `76.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.positivesslWildcard
/**
 * _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year purchase: `79.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.premiumssl
/**
 * 1-year purchase: `56.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.quicksslPremium
/**
 * 1-year purchase: `10.95 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.rapidssl
/**
 * 1-year purchase: `148.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.rapidsslWildcard
/**
 * 1-year purchase: `285.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.secureSite
/**
 * 1-year purchase: `675.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.secureSitePro
/**
 * 1-year purchase: `961.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.secureSiteProWithEv
/**
 * 1-year purchase: `666.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.secureSiteWithEv
/**
 * 1-year purchase: `98.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.trueBusinessid
/**
 * 1-year purchase: `389.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.trueBusinessidWildcard
/**
 * 1-year purchase: `179.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.trueBusinessidWithEv
/**
 * _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year purchase: `169.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.premiumsslWildcard
/**
 * _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year purchase: `18.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.essentialssl
/**
 * _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year purchase: `74.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.essentialsslWildcard
/**
 * _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year purchase: `78.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.evSsl
/**
 * _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year purchase: `38.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.instantsslPro
/**
 * 1-year purchase: `39.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.ssl123
/**
 * 1-year purchase: `88.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.sslWebServer
/**
 * 1-year purchase: `163.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.sslWebserverEv
/**
 * 1-year purchase: `35.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.comodossl
/**
 * 1-year purchase: `170.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.comodosslWildcard
/**
 * _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year purchase: `89.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.comodosslMultiDomainSsl
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.comodosslMultiDomainSslMoresans
/**
 * _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year purchase: `168.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.comodosslEvMultiDomainSsl
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.comodosslEvMultiDomainSslMoresans
/**
 * _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year purchase: `29.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.positivesslMultiDomain
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.positivesslMultiDomainMoresans
/**
 * 1-year purchase: `179.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.trueBusinessidMultiDomain
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.trueBusinessidMultiDomainMoresans
/**
 * 1-year purchase: `237.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.trueBusinessidWithEvMultiDomain
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.trueBusinessidWithEvMultiDomainMoresans
/**
 * _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year purchase: `89.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.unifiedCommunications
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.unifiedCommunicationsMoresans
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.secureSiteMoresans
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.quicksslPremiumMoresans
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.secureSiteProMoresans
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.secureSiteProWithEvMoresans
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.secureSiteWithEvMoresans
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.sgcSuperCertsMoresans
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.sslWebServerMoresans
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLPurchase.prototype.sslWebserverEvMoresans
/**
 * The pricing to renew certificates.
 * @record
 */
_namecheap.SSLRenew
/**
 * _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year renewal: `31.98 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.instantssl
/**
 * _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year renewal: `7.28 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.positivessl
/**
 * _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year renewal: `77.08 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.positivesslWildcard
/**
 * _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year renewal: `64.78 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.premiumssl
/**
 * 1-year renewal: `46.64 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.quicksslPremium
/**
 * 1-year renewal: `8.98 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.rapidssl
/**
 * 1-year renewal: `122.08 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.rapidsslWildcard
/**
 * 1-year renewal: `234.42 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.secureSite
/**
 * 1-year renewal: `554.22 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.secureSitePro
/**
 * 1-year renewal: `788.74 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.secureSiteProWithEv
/**
 * 1-year renewal: `546.84 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.secureSiteWithEv
/**
 * 1-year renewal: `80.36 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.trueBusinessid
/**
 * 1-year renewal: `318.98 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.trueBusinessidWildcard
/**
 * 1-year renewal: `146.78 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.trueBusinessidWithEv
/**
 * 1-year renewal: `31.98 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.ssl123
/**
 * 1-year renewal: `72.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.sslWebServer
/**
 * 1-year renewal: `134.38 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.sslWebserverEv
/**
 * _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year renewal: `18.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.essentialssl
/**
 * _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year renewal: `74.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.essentialsslWildcard
/**
 * _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year renewal: `118.90 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.evSsl
/**
 * _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year renewal: `48.38 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.instantsslPro
/**
 * _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year renewal: `138.58 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.premiumsslWildcard
/**
 * 1-year renewal: `28.70 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.comodossl
/**
 * _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year renewal: `73.70 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.comodosslMultiDomainSsl
/**
 * _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year renewal: `203.26 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.comodosslEvMultiDomainSsl
/**
 * _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year renewal: `24.50 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.positivesslMultiDomain
/**
 * 1-year renewal: `147.50 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.trueBusinessidMultiDomain
/**
 * 1-year renewal: `195.06 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.trueBusinessidWithEvMultiDomain
/**
 * _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year renewal: `73.70 USD`
 * @type {_namecheap.Product}
 */
_namecheap.SSLRenew.prototype.unifiedCommunications

/* typal types/api/users/pricing/whois.xml externs */
/**
 * The pricing to purchase WHOIS guards.
 * @record
 */
_namecheap.WhoisPurchase
/**
 * 1-year purchase: `7.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.WhoisPurchase.prototype.whoisguard5Pack
/**
 * 1-year purchase: `4.88 USD`
 * @type {_namecheap.Product}
 */
_namecheap.WhoisPurchase.prototype.whoisguardDualPack
/**
 * 1-year purchase: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.WhoisPurchase.prototype.whoisguardProtectOne
/**
 * The pricing to renew WHOIS guards.
 * @record
 */
_namecheap.WhoisRenew
/**
 * 1-year renewal: `0.00 USD`
 * @type {_namecheap.Product}
 */
_namecheap.WhoisRenew.prototype.whoisguardProtectOne
