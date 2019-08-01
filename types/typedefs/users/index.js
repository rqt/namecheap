export {}
/* typal types/api/users/get-pricing.xml noSuppress */
/**
 * @typedef {_namecheap.GetPricing} GetPricing Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx
 */
/**
 * @typedef {Object} _namecheap.GetPricing Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx
 * @prop {string} type Product Type to get pricing information.
 * One of `DOMAIN`, `SSLCERTIFICATE`, `WHOISGUARD`.
 * @prop {string} [category] Specific category within a product type, e.g., `DOMAINS`, `COMODO`, `WHOISGUARD`.
 * @prop {string} [promoCode] Promotional (coupon) code for the user.
 * @prop {string} [action] Specific action within a product type.
 * One of `REGISTER`, `PURCHASE`, `RENEW`, `REACTIVATE`, `TRANSFER`.
 * @prop {string} [product] The name of the product within a product type, e.g., `COM`, `INSTANTSSL`, `WHOISGUARD-PROTECT-ONE`.
 */
/**
 * @typedef {_namecheap.Pricing} Pricing The pricing information returned as an object. The data is split into 3 types: `Domain`, `SSL` and `Whois`.
 */
/**
 * @typedef {Object} _namecheap.Pricing The pricing information returned as an object. The data is split into 3 types: `Domain`, `SSL` and `Whois`.
 * @prop {_namecheap.DomainPricing} domains The pricing of domains.
 * @prop {_namecheap.SSLPricing} ssl The pricing of certificates.
 * @prop {_namecheap.WhoisPricing} whoisguard The pricing of the Whois Guard.
 */
/**
 * @typedef {_namecheap.DomainPricing} DomainPricing The pricing of domains as an object, where the requested zone is a key.
 */
/**
 * @typedef {Object} _namecheap.DomainPricing The pricing of domains as an object, where the requested zone is a key.
 * @prop {Object<string, _namecheap.Product>} register The pricing to register domains.
 * @prop {Object<string, _namecheap.Product>} renew The pricing to renew domains.
 * @prop {Object<string, _namecheap.Product>} reactivate The pricing to reactivate domains.
 * @prop {Object<string, _namecheap.Product>} transfer The pricing to transfer domains.
 */
/**
 * @typedef {_namecheap.SSLPricing} SSLPricing The pricing of certificates.
 */
/**
 * @typedef {Object} _namecheap.SSLPricing The pricing of certificates.
 * @prop {_namecheap.SSLPurchase} purchase The pricing to purchase certificates.
 * @prop {_namecheap.SSLRenew} renew The pricing to renew certificates.
 */
/**
 * @typedef {_namecheap.WhoisPricing} WhoisPricing The pricing of the Whois Guard.
 */
/**
 * @typedef {Object} _namecheap.WhoisPricing The pricing of the Whois Guard.
 * @prop {_namecheap.WhoisPurchase} purchase The pricing to purchase WHOIS guards.
 * @prop {_namecheap.WhoisRenew} renew The pricing to renew WHOIS guards.
 */
/**
 * @typedef {_namecheap.Product} Product A product consists of an array of prices for different durations.
 */
/**
 * @typedef {!Array<!_namecheap.Price>} _namecheap.Product A product consists of an array of prices for different durations.
 */
/**
 * @typedef {_namecheap.Price} Price Price data for a product accoding to the duration of an action.
 */
/**
 * @typedef {Object} _namecheap.Price Price data for a product accoding to the duration of an action.
 * @prop {number} Duration The duration of the product, e.g., `1`.
 * @prop {string} DurationType The duration type of the product, e.g., `YEAR`.
 * @prop {string} Price Indicates Final price (it can be from regular, userprice, special price,promo price, tier price), e.g., `20.88`.
 * @prop {string} PricingType Either `MULTIPLE` or `ABSOULTE`.
 * @prop {string} [AdditionalCost] Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.
 * @prop {string} RegularPrice Indicates regular price, e.g., `39.00`.
 * @prop {string} RegularPriceType Either `MULTIPLE` or `ABSOULTE`.
 * @prop {string} [RegularAdditionalCost] Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.
 * @prop {string} [RegularAdditionalCostType] Either `MULTIPLE` or `ABSOULTE`.
 * @prop {string} YourPrice The user’s price for the product, e.g., `20.88`.
 * @prop {string} YourPriceType Either `MULTIPLE` or `ABSOULTE`.
 * @prop {string} [YourAdditonalCost] Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.
 * @prop {string} [YourAdditonalCostType] Either `MULTIPLE` or `ABSOULTE`.
 * @prop {string} PromotionPrice Price with coupon enabled.
 * @prop {string} Currency Currency in which the price is listed, e.g., `USD`.
 */

/* typal types/api/users/pricing/ssl.xml noSuppress */
/**
 * @typedef {_namecheap.SSLPurchase} SSLPurchase `＠record` The pricing to purchase certificates.
 */
/**
 * @typedef {Object} _namecheap.SSLPurchase `＠record` The pricing to purchase certificates.
 * @prop {_namecheap.Product} instantssl _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year purchase: `20.88 USD`
 * @prop {_namecheap.Product} positivessl _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year purchase: `8.88 USD`
 * @prop {_namecheap.Product} positivesslWildcard _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year purchase: `76.88 USD`
 * @prop {_namecheap.Product} premiumssl _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year purchase: `79.00 USD`
 * @prop {_namecheap.Product} quicksslPremium 1-year purchase: `56.88 USD`
 * @prop {_namecheap.Product} rapidssl 1-year purchase: `10.95 USD`
 * @prop {_namecheap.Product} rapidsslWildcard 1-year purchase: `148.88 USD`
 * @prop {_namecheap.Product} secureSite 1-year purchase: `285.88 USD`
 * @prop {_namecheap.Product} secureSitePro 1-year purchase: `675.88 USD`
 * @prop {_namecheap.Product} secureSiteProWithEv 1-year purchase: `961.88 USD`
 * @prop {_namecheap.Product} secureSiteWithEv 1-year purchase: `666.88 USD`
 * @prop {_namecheap.Product} trueBusinessid 1-year purchase: `98.00 USD`
 * @prop {_namecheap.Product} trueBusinessidWildcard 1-year purchase: `389.00 USD`
 * @prop {_namecheap.Product} trueBusinessidWithEv 1-year purchase: `179.00 USD`
 * @prop {_namecheap.Product} premiumsslWildcard _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year purchase: `169.00 USD`
 * @prop {_namecheap.Product} essentialssl _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year purchase: `18.88 USD`
 * @prop {_namecheap.Product} essentialsslWildcard _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year purchase: `74.88 USD`
 * @prop {_namecheap.Product} evSsl _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year purchase: `78.88 USD`
 * @prop {_namecheap.Product} instantsslPro _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year purchase: `38.88 USD`
 * @prop {_namecheap.Product} ssl123 1-year purchase: `39.00 USD`
 * @prop {_namecheap.Product} sslWebServer 1-year purchase: `88.88 USD`
 * @prop {_namecheap.Product} sslWebserverEv 1-year purchase: `163.88 USD`
 * @prop {_namecheap.Product} comodossl 1-year purchase: `35.00 USD`
 * @prop {_namecheap.Product} comodosslWildcard 1-year purchase: `170.00 USD`
 * @prop {_namecheap.Product} comodosslMultiDomainSsl _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year purchase: `89.88 USD`
 * @prop {_namecheap.Product} comodosslMultiDomainSslMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} comodosslEvMultiDomainSsl _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year purchase: `168.88 USD`
 * @prop {_namecheap.Product} comodosslEvMultiDomainSslMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} positivesslMultiDomain _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year purchase: `29.88 USD`
 * @prop {_namecheap.Product} positivesslMultiDomainMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} trueBusinessidMultiDomain 1-year purchase: `179.88 USD`
 * @prop {_namecheap.Product} trueBusinessidMultiDomainMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} trueBusinessidWithEvMultiDomain 1-year purchase: `237.88 USD`
 * @prop {_namecheap.Product} trueBusinessidWithEvMultiDomainMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} unifiedCommunications _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year purchase: `89.88 USD`
 * @prop {_namecheap.Product} unifiedCommunicationsMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} secureSiteMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} quicksslPremiumMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} secureSiteProMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} secureSiteProWithEvMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} secureSiteWithEvMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} sgcSuperCertsMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} sslWebServerMoresans 1-year purchase: `0.00 USD`
 * @prop {_namecheap.Product} sslWebserverEvMoresans 1-year purchase: `0.00 USD`
 */
/**
 * @typedef {_namecheap.SSLRenew} SSLRenew `＠record` The pricing to renew certificates.
 */
/**
 * @typedef {Object} _namecheap.SSLRenew `＠record` The pricing to renew certificates.
 * @prop {_namecheap.Product} instantssl _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year renewal: `31.98 USD`
 * @prop {_namecheap.Product} positivessl _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year renewal: `7.28 USD`
 * @prop {_namecheap.Product} positivesslWildcard _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year renewal: `77.08 USD`
 * @prop {_namecheap.Product} premiumssl _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year renewal: `64.78 USD`
 * @prop {_namecheap.Product} quicksslPremium 1-year renewal: `46.64 USD`
 * @prop {_namecheap.Product} rapidssl 1-year renewal: `8.98 USD`
 * @prop {_namecheap.Product} rapidsslWildcard 1-year renewal: `122.08 USD`
 * @prop {_namecheap.Product} secureSite 1-year renewal: `234.42 USD`
 * @prop {_namecheap.Product} secureSitePro 1-year renewal: `554.22 USD`
 * @prop {_namecheap.Product} secureSiteProWithEv 1-year renewal: `788.74 USD`
 * @prop {_namecheap.Product} secureSiteWithEv 1-year renewal: `546.84 USD`
 * @prop {_namecheap.Product} trueBusinessid 1-year renewal: `80.36 USD`
 * @prop {_namecheap.Product} trueBusinessidWildcard 1-year renewal: `318.98 USD`
 * @prop {_namecheap.Product} trueBusinessidWithEv 1-year renewal: `146.78 USD`
 * @prop {_namecheap.Product} ssl123 1-year renewal: `31.98 USD`
 * @prop {_namecheap.Product} sslWebServer 1-year renewal: `72.88 USD`
 * @prop {_namecheap.Product} sslWebserverEv 1-year renewal: `134.38 USD`
 * @prop {_namecheap.Product} essentialssl _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year renewal: `18.88 USD`
 * @prop {_namecheap.Product} essentialsslWildcard _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year renewal: `74.88 USD`
 * @prop {_namecheap.Product} evSsl _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year renewal: `118.90 USD`
 * @prop {_namecheap.Product} instantsslPro _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year renewal: `48.38 USD`
 * @prop {_namecheap.Product} premiumsslWildcard _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year renewal: `138.58 USD`
 * @prop {_namecheap.Product} comodossl 1-year renewal: `28.70 USD`
 * @prop {_namecheap.Product} comodosslMultiDomainSsl _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year renewal: `73.70 USD`
 * @prop {_namecheap.Product} comodosslEvMultiDomainSsl _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year renewal: `203.26 USD`
 * @prop {_namecheap.Product} positivesslMultiDomain _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year renewal: `24.50 USD`
 * @prop {_namecheap.Product} trueBusinessidMultiDomain 1-year renewal: `147.50 USD`
 * @prop {_namecheap.Product} trueBusinessidWithEvMultiDomain 1-year renewal: `195.06 USD`
 * @prop {_namecheap.Product} unifiedCommunications _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year renewal: `73.70 USD`
 */

/* typal types/api/users/pricing/whois.xml noSuppress */
/**
 * @typedef {_namecheap.WhoisPurchase} WhoisPurchase `＠record` The pricing to purchase WHOIS guards.
 */
/**
 * @typedef {Object} _namecheap.WhoisPurchase `＠record` The pricing to purchase WHOIS guards.
 * @prop {_namecheap.Product} whoisguard5Pack 1-year purchase: `7.88 USD`
 * @prop {_namecheap.Product} whoisguardDualPack 1-year purchase: `4.88 USD`
 * @prop {_namecheap.Product} whoisguardProtectOne 1-year purchase: `0.00 USD`
 */
/**
 * @typedef {_namecheap.WhoisRenew} WhoisRenew `＠record` The pricing to renew WHOIS guards.
 */
/**
 * @typedef {Object} _namecheap.WhoisRenew `＠record` The pricing to renew WHOIS guards.
 * @prop {_namecheap.Product} whoisguardProtectOne 1-year renewal: `0.00 USD`
 */
