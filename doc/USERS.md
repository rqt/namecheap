## `users`

Methods related to the user.

- [`users`](#users)
  * [`async getPricing(options: GetPricing): Pricing`](#async-getpricingoptions-getpricing-pricing)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true" width="25"></a></p>

### `async getPricing(`<br/>&nbsp;&nbsp;`options: GetPricing,`<br/>`): Pricing`

Returns pricing information for a requested product type.

__<a name="type-getpricing">`GetPricing`</a>__: Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx

|   Name    |      Type       |                                                 Description                                                  |
| --------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| __type*__ | <em>string</em> | Product Type to get pricing information. One of `('DOMAIN'\|'SSLCERTIFICATE'\|'WHOISGUARD')`                 |
| category  | <em>string</em> | Specific category within a product type, e.g., `DOMAINS`, `COMODO`, `WHOISGUARD`.                            |
| promoCode | <em>string</em> | Promotional (coupon) code for the user.                                                                      |
| action    | <em>string</em> | Specific action within a product type. One of `('REGISTER'\|'PURCHASE'\|'RENEW'\|'REACTIVATE'\|'TRANSFER')`. |
| product   | <em>string</em> | The name of the product within a product type, e.g., `COM`, `INSTANTSSL`, `WHOISGUARD-PROTECT-ONE`.          |

The returned object will contain data according to requested types, categories, actions and products.

```js
/**
 * @param {NameCheap} client
 */
const GetPricing = async (client, options = {
  type: 'DOMAIN',
  action: 'REGISTER',
  product: 'COM',
}) => {
  const res = await client.users.getPricing(options)
  return res
}
```

__<a name="type-pricing">`Pricing`</a>__: The pricing information returned as an object. The data is split into 3 types: `Domain`, `SSL` and `Whois`.

|      Name       |                                                                   Type                                                                   |           Description           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| __domains*__    | <em><a href="#type-domainpricing" title="The pricing of domains as an object, where the requested zone is a key.">DomainPricing</a></em> | The pricing of domains.         |
| __ssl*__        | <em><a href="#type-sslpricing" title="The pricing of certificates.">SSLPricing</a></em>                                                  | The pricing of certificates.    |
| __whoisguard*__ | <em><a href="#type-whoispricing" title="The pricing of the Whois Guard.">WhoisPricing</a></em>                                           | The pricing of the Whois Guard. |

`!Array<!Price>` __<a name="type-product">`Product`</a>__: A product consists of an array of prices for different durations.

__<a name="type-price">`Price`</a>__: Price data for a product accoding to the duration of an action.

|           Name            |      Type       |                                                   Description                                                    |
| ------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------- |
| __Duration*__             | <em>number</em> | The duration of the product, e.g., `1`.                                                                          |
| __DurationType*__         | <em>string</em> | The duration type of the product, e.g., `YEAR`.                                                                  |
| __Price*__                | <em>string</em> | Indicates Final price (it can be from regular, userprice, special price,promo price, tier price), e.g., `20.88`. |
| __PricingType*__          | <em>string</em> | Always set to `MULTIPLE`.                                                                                        |
| AdditionalCost            | <em>string</em> | Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.                                 |
| __RegularPrice*__         | <em>string</em> | Indicates regular price, e.g., `39.00`.                                                                          |
| __RegularPriceType*__     | <em>string</em> | Always set to `MULTIPLE`.                                                                                        |
| RegularAdditionalCost     | <em>string</em> | Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.                                 |
| RegularAdditionalCostType | <em>string</em> | Always set to `MULTIPLE`.                                                                                        |
| __YourPrice*__            | <em>string</em> | The user’s price for the product, e.g., `20.88`.                                                                 |
| __YourPriceType*__        | <em>string</em> | Always set to `MULTIPLE`.                                                                                        |
| YourAdditonalCost         | <em>string</em> | Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.                                 |
| YourAdditonalCostType     | <em>string</em> | Always set to `MULTIPLE`.                                                                                        |
| __PromotionPrice*__       | <em>string</em> | Price with coupon enabled.                                                                                       |
| __Currency*__             | <em>string</em> | Currency in which the price is listed, e.g., `USD`.                                                              |

__<a name="type-domainpricing">`DomainPricing`</a>__: The pricing of domains as an object, where the requested zone is a key.

|      Name       |                                                                     Type                                                                     |            Description             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| __register*__   | <em>Object&lt;string, <a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a>&gt;</em> | The pricing to register domains.   |
| __renew*__      | <em>Object&lt;string, <a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a>&gt;</em> | The pricing to renew domains.      |
| __reactivate*__ | <em>Object&lt;string, <a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a>&gt;</em> | The pricing to reactivate domains. |
| __transfer*__   | <em>Object&lt;string, <a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a>&gt;</em> | The pricing to transfer domains.   |

__<a name="type-sslpricing">`SSLPricing`</a>__: The pricing of certificates.

|     Name      |                                                Type                                                |              Description              |
| ------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------- |
| __purchase*__ | <em><a href="#type-sslpurchase" title="The pricing to purchase certificates.">SSLPurchase</a></em> | The pricing to purchase certificates. |
| __renew*__    | <em><a href="#type-sslrenew" title="The pricing to renew certificates.">SSLRenew</a></em>          | The pricing to renew certificates.    |

<details>
<summary>Show SSL Product Pricing</summary>

__<a name="type-sslpurchase">`SSLPurchase`</a>__: The pricing to purchase certificates.

|                     Name                     |                                                          Type                                                          |                                                                    Description                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| __instantssl*__                              | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year purchase: `20.88 USD`                             |
| __positivessl*__                             | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year purchase: `8.88 USD`                            |
| __positivesslWildcard*__                     | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year purchase: `76.88 USD`         |
| __premiumssl*__                              | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year purchase: `79.00 USD`                             |
| __quicksslPremium*__                         | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `56.88 USD`                                                                                                                      |
| __rapidssl*__                                | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `10.95 USD`                                                                                                                      |
| __rapidsslWildcard*__                        | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `148.88 USD`                                                                                                                     |
| __secureSite*__                              | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `285.88 USD`                                                                                                                     |
| __secureSitePro*__                           | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `675.88 USD`                                                                                                                     |
| __secureSiteProWithEv*__                     | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `961.88 USD`                                                                                                                     |
| __secureSiteWithEv*__                        | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `666.88 USD`                                                                                                                     |
| __trueBusinessid*__                          | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `98.00 USD`                                                                                                                      |
| __trueBusinessidWildcard*__                  | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `389.00 USD`                                                                                                                     |
| __trueBusinessidWithEv*__                    | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `179.00 USD`                                                                                                                     |
| __premiumsslWildcard*__                      | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year purchase: `169.00 USD`          |
| __essentialssl*__                            | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year purchase: `18.88 USD`                         |
| __essentialsslWildcard*__                    | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year purchase: `74.88 USD`       |
| __evSsl*__                                   | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year purchase: `78.88 USD`                                         |
| __instantsslPro*__                           | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year purchase: `38.88 USD`                     |
| __ssl123*__                                  | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `39.00 USD`                                                                                                                      |
| __sslWebServer*__                            | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `88.88 USD`                                                                                                                      |
| __sslWebserverEv*__                          | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `163.88 USD`                                                                                                                     |
| __comodossl*__                               | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `35.00 USD`                                                                                                                      |
| __comodosslWildcard*__                       | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `170.00 USD`                                                                                                                     |
| __comodosslMultiDomainSsl*__                 | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year purchase: `89.88 USD`                 |
| __comodosslMultiDomainSslMoresans*__         | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __comodosslEvMultiDomainSsl*__               | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year purchase: `168.88 USD`          |
| __comodosslEvMultiDomainSslMoresans*__       | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __positivesslMultiDomain*__                  | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year purchase: `29.88 USD` |
| __positivesslMultiDomainMoresans*__          | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __trueBusinessidMultiDomain*__               | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `179.88 USD`                                                                                                                     |
| __trueBusinessidMultiDomainMoresans*__       | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __trueBusinessidWithEvMultiDomain*__         | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `237.88 USD`                                                                                                                     |
| __trueBusinessidWithEvMultiDomainMoresans*__ | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __unifiedCommunications*__                   | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year purchase: `89.88 USD`     |
| __unifiedCommunicationsMoresans*__           | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __secureSiteMoresans*__                      | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __quicksslPremiumMoresans*__                 | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __secureSiteProMoresans*__                   | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __secureSiteProWithEvMoresans*__             | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __secureSiteWithEvMoresans*__                | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __sgcSuperCertsMoresans*__                   | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __sslWebServerMoresans*__                    | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |
| __sslWebserverEvMoresans*__                  | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD`                                                                                                                       |

__<a name="type-sslrenew">`SSLRenew`</a>__: The pricing to renew certificates.

|                 Name                 |                                                          Type                                                          |                                                                   Description                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| __instantssl*__                      | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year renewal: `31.98 USD`                             |
| __positivessl*__                     | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year renewal: `7.28 USD`                            |
| __positivesslWildcard*__             | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year renewal: `77.08 USD`         |
| __premiumssl*__                      | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year renewal: `64.78 USD`                             |
| __quicksslPremium*__                 | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `46.64 USD`                                                                                                                      |
| __rapidssl*__                        | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `8.98 USD`                                                                                                                       |
| __rapidsslWildcard*__                | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `122.08 USD`                                                                                                                     |
| __secureSite*__                      | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `234.42 USD`                                                                                                                     |
| __secureSitePro*__                   | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `554.22 USD`                                                                                                                     |
| __secureSiteProWithEv*__             | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `788.74 USD`                                                                                                                     |
| __secureSiteWithEv*__                | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `546.84 USD`                                                                                                                     |
| __trueBusinessid*__                  | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `80.36 USD`                                                                                                                      |
| __trueBusinessidWildcard*__          | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `318.98 USD`                                                                                                                     |
| __trueBusinessidWithEv*__            | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `146.78 USD`                                                                                                                     |
| __ssl123*__                          | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `31.98 USD`                                                                                                                      |
| __sslWebServer*__                    | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `72.88 USD`                                                                                                                      |
| __sslWebserverEv*__                  | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `134.38 USD`                                                                                                                     |
| __essentialssl*__                    | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year renewal: `18.88 USD`                         |
| __essentialsslWildcard*__            | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year renewal: `74.88 USD`       |
| __evSsl*__                           | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year renewal: `118.90 USD`                                        |
| __instantsslPro*__                   | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year renewal: `48.38 USD`                     |
| __premiumsslWildcard*__              | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year renewal: `138.58 USD`          |
| __comodossl*__                       | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `28.70 USD`                                                                                                                      |
| __comodosslMultiDomainSsl*__         | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year renewal: `73.70 USD`                 |
| __comodosslEvMultiDomainSsl*__       | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year renewal: `203.26 USD`          |
| __positivesslMultiDomain*__          | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year renewal: `24.50 USD` |
| __trueBusinessidMultiDomain*__       | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `147.50 USD`                                                                                                                     |
| __trueBusinessidWithEvMultiDomain*__ | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `195.06 USD`                                                                                                                     |
| __unifiedCommunications*__           | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year renewal: `73.70 USD`     |
</details>
<br/>

__<a name="type-whoispricing">`WhoisPricing`</a>__: The pricing of the Whois Guard.

|     Name      |                                                  Type                                                  |              Description              |
| ------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| __purchase*__ | <em><a href="#type-whoispurchase" title="The pricing to purchase WHOIS guards.">WhoisPurchase</a></em> | The pricing to purchase WHOIS guards. |
| __renew*__    | <em><a href="#type-whoisrenew" title="The pricing to renew WHOIS guards.">WhoisRenew</a></em>          | The pricing to renew WHOIS guards.    |

<details>
<summary>Show Whois Product Pricing</summary>

__<a name="type-whoispurchase">`WhoisPurchase`</a>__: The pricing to purchase WHOIS guards.

|           Name            |                                                          Type                                                          |         Description         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| __whoisguard5Pack*__      | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `7.88 USD` |
| __whoisguardDualPack*__   | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `4.88 USD` |
| __whoisguardProtectOne*__ | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year purchase: `0.00 USD` |

__<a name="type-whoisrenew">`WhoisRenew`</a>__: The pricing to renew WHOIS guards.

|           Name            |                                                          Type                                                          |        Description         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| __whoisguardProtectOne*__ | <em><a href="#type-product" title="A product consists of an array of prices for different durations.">Product</a></em> | 1-year renewal: `0.00 USD` |
</details>
<br/>

<details>
<summary>Show Example COM Domain Registration Pricing Output</summary>

```json5
{
  "domains": {
    "register": {
      "com": [
        {
          "Duration": 1,
          "DurationType": "YEAR",
          "Price": "8.88",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.98",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "8.88",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 2,
          "DurationType": "YEAR",
          "Price": "10.88",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.88",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "10.88",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 3,
          "DurationType": "YEAR",
          "Price": "10.78",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.78",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "10.78",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 4,
          "DurationType": "YEAR",
          "Price": "10.68",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.68",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "10.68",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 5,
          "DurationType": "YEAR",
          "Price": "10.58",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.58",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "10.58",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 6,
          "DurationType": "YEAR",
          "Price": "10.58",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.58",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "10.58",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 7,
          "DurationType": "YEAR",
          "Price": "10.58",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.58",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "10.58",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 8,
          "DurationType": "YEAR",
          "Price": "10.58",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.58",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "10.58",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 9,
          "DurationType": "YEAR",
          "Price": "10.58",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.58",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "10.58",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        },
        {
          "Duration": 10,
          "DurationType": "YEAR",
          "Price": "10.58",
          "PricingType": "MULTIPLE",
          "AdditionalCost": "0.18",
          "RegularPrice": "10.58",
          "RegularPriceType": "MULTIPLE",
          "RegularAdditionalCost": "0.18",
          "RegularAdditionalCostType": "MULTIPLE",
          "YourPrice": "10.58",
          "YourPriceType": "MULTIPLE",
          "YourAdditonalCost": "0.18",
          "YourAdditonalCostType": "MULTIPLE",
          "PromotionPrice": "0.0",
          "Currency": "USD"
        }
      ]
    }
  }
}
```
</details>

[Show Example SSL Purchase Pricing Output](https://github.com/rqt/namecheap/blob/master/doc/ssl-pricing.md)



<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

<kbd><a href="/">Back To Readme</a></kbd>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>