export {}
/* typal types/api/users/get-pricing.xml noSuppress */
/**
 * @typedef {_namecheap.GetPricing} GetPricing Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx
 */
/**
 * @typedef {Object} _namecheap.GetPricing Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx
 * @prop {string} type Product Type to get pricing information. One of `('DOMAIN'|'SSLCERTIFICATE'|'WHOISGUARD')`
 * @prop {string} [category] Specific category within a product type, e.g., `DOMAINS`, `COMODO`, `WHOISGUARD`.
 * @prop {string} [promoCode] Promotional (coupon) code for the user.
 * @prop {string} [action] Specific action within a product type. One of `('REGISTER'|'PURCHASE'|'RENEW'|'REACTIVATE'|'TRANSFER')`.
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
 * @prop {string} PricingType Always set to `MULTIPLE`.
 * @prop {string} [AdditionalCost] Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.
 * @prop {string} RegularPrice Indicates regular price, e.g., `39.00`.
 * @prop {string} RegularPriceType Always set to `MULTIPLE`.
 * @prop {string} [RegularAdditionalCost] Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.
 * @prop {string} [RegularAdditionalCostType] Always set to `MULTIPLE`.
 * @prop {string} YourPrice The user’s price for the product, e.g., `20.88`.
 * @prop {string} YourPriceType Always set to `MULTIPLE`.
 * @prop {string} [YourAdditonalCost] Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.
 * @prop {string} [YourAdditonalCostType] Always set to `MULTIPLE`.
 * @prop {string} PromotionPrice Price with coupon enabled.
 * @prop {string} Currency Currency in which the price is listed, e.g., `USD`.
 */

/* documentary types/api/users/pricing/ssl.xml noSuppress */
/**
 * @typedef {_namecheap.SSLPurchase} SSLPurchase The pricing to purchase certificates.
 */
/**
 * @typedef {Object} _namecheap.SSLPurchase The pricing to purchase certificates.
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
 */
/**
 * @typedef {_namecheap.SSLRenew} SSLRenew The pricing to renew certificates.
 */
/**
 * @typedef {Object} _namecheap.SSLRenew The pricing to renew certificates.
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

/* documentary types/api/users/pricing/whois.xml noSuppress */
/**
 * @typedef {_namecheap.WhoisPurchase} WhoisPurchase The pricing to purchase WHOIS guards.
 */
/**
 * @typedef {Object} _namecheap.WhoisPurchase The pricing to purchase WHOIS guards.
 * @prop {Product} whoisguard5Pack 1-year purchase: `7.88 USD`
 * @prop {Product} whoisguardDualPack 1-year purchase: `4.88 USD`
 * @prop {Product} whoisguardProtectOne 1-year purchase: `0.00 USD`
 */
/**
 * @typedef {_namecheap.WhoisRenew} WhoisRenew The pricing to renew WHOIS guards.
 */
/**
 * @typedef {Object} _namecheap.WhoisRenew The pricing to renew WHOIS guards.
 * @prop {Product} whoisguardProtectOne 1-year renewal: `0.00 USD`
 */
