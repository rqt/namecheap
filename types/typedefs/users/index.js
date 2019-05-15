export {}
/* typal types/api/users/get-pricing.xml noSuppress */
/**
 * @typedef {_namecheap.GetPricing} GetPricing Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx
 */
/**
 * @typedef {Object} _namecheap.GetPricing Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx
 * @prop {'DOMAIN'|'SSLCERTIFICATE'|'WHOISGUARD'} type Product Type to get pricing information.
 * @prop {string} [category] Specific category within a product type, e.g., `DOMAINS`, `COMODO`, `WHOISGUARD`.
 * @prop {string} [promoCode] Promotional (coupon) code for the user.
 * @prop {'REGISTER'|'PURCHASE'|'RENEW'|'REACTIVATE'|'TRANSFER'} [action] Specific action within a product type.
 * @prop {string} [product] The name of the product within a product type, e.g., `COM`, `INSTANTSSL`, `WHOISGUARD-PROTECT-ONE`.
 */
/**
 * @typedef {_namecheap.Pricing} Pricing The pricing information returned as an object. The data is split into 3 types: `Domain`, `SSL` and `Whois`.
 */
/**
 * @typedef {Object} _namecheap.Pricing The pricing information returned as an object. The data is split into 3 types: `Domain`, `SSL` and `Whois`.
 * @prop {DomainPricing} domains The pricing of domains.
 * @prop {SSLPricing} ssl The pricing of certificates.
 * @prop {WhoisPricing} whoisguard The pricing of the Whois Guard.
 */
/**
 * @typedef {_namecheap.DomainPricing} DomainPricing The pricing of domains as an object, where the requested zone is a key.
 */
/**
 * @typedef {Object} _namecheap.DomainPricing The pricing of domains as an object, where the requested zone is a key.
 * @prop {Object.<string, Product>} register The pricing to register domains.
 * @prop {Object.<string, Product>} renew The pricing to renew domains.
 * @prop {Object.<string, Product>} reactivate The pricing to reactivate domains.
 * @prop {Object.<string, Product>} transfer The pricing to transfer domains.
 */
/**
 * @typedef {_namecheap.SSLPricing} SSLPricing The pricing of certificates.
 */
/**
 * @typedef {Object} _namecheap.SSLPricing The pricing of certificates.
 * @prop {SSLPurchase} purchase The pricing to purchase certificates.
 * @prop {SSLRenew} renew The pricing to renew certificates.
 */
/**
 * @typedef {_namecheap.WhoisPricing} WhoisPricing The pricing of the Whois Guard.
 */
/**
 * @typedef {Object} _namecheap.WhoisPricing The pricing of the Whois Guard.
 * @prop {WhoisPurchase} purchase The pricing to purchase WHOIS guards.
 * @prop {WhoisRenew} renew The pricing to renew WHOIS guards.
 */
/**
 * @typedef {_namecheap.Product} Product A product consists of an array of prices for different durations.
 */
/**
 * @typedef {Price[]} _namecheap.Product A product consists of an array of prices for different durations.
 */
/**
 * @typedef {_namecheap.Price} Price Price data for a product accoding to the duration of an action.
 */
/**
 * @typedef {Object} _namecheap.Price Price data for a product accoding to the duration of an action.
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
