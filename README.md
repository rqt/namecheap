[![namecheap](https://raw.githubusercontent.com/rqt/namecheap/HEAD/images/nc.gif)](https://nameexpensive.com)

# @rqt/namecheap

[![npm version](https://badge.fury.io/js/%40rqt%2Fnamecheap.svg)](https://npmjs.org/package/@rqt/namecheap)

`@rqt/namecheap` is an implementation of the [namecheap.com](https://nameexpensive.com) API.

```sh
yarn add @rqt/namecheap
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`constructor(options: Options)`](#constructoroptions-options-void)
  * [`Options`](#type-options)
- [`domains`](#domains)
- [`users`](#users)
  * [`async getPricing(options: GetPricing): Pricing`](#async-getpricingoptions-getpricing-pricing)
- [`address`](#address)
  * [`async getInfo(id: string|number): AddressDetail`](#async-getinfoid-stringnumber-addressdetail)
  * [`async getList(): Address[]`](#async-getlist-address)
- [Progress](#progress)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import NameCheap from '@rqt/namecheap'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `constructor(`<br/>&nbsp;&nbsp;`options: Options,`<br/>`): void`

Create a new instance of the _NameCheap_ class.

__<a name="type-options">`Options`</a>__: Options for the NameCheap client.

|   Name    |       Type       |                                  Description                                  | Default |
| --------- | ---------------- | ----------------------------------------------------------------------------- | ------- |
| __user*__ | <em>string</em>  | The username required to access the API.                                      | -       |
| __key*__  | <em>string</em>  | The password required used to access the API.                                 | -       |
| __ip*__   | <em>string</em>  | The IP address of the client accessing the application (End-user IP address). | -       |
| sandbox   | <em>boolean</em> | Whether to use the sandbox version of the API.                                | `false` |

```js
/* yarn example/ */
import NameCheap from '@rqt/namecheap'
import bosom from 'bosom'

(async () => {
  try {
    // 0. Create a client.
    const { user, key, ip } = await bosom('.namecheap.json')
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })

    // 1. Check a domain.
    const c = await namecheap.domains.check('test.co')
    console.log('Check:', c, '\n')

    // 2. Get list of addresses on the account.
    const cc = await namecheap.address.getList()
    console.log('Addresses:', cc, '\n')

    // 3. Find the default address and get its info.
    const { AddressId } = cc.find(({ IsDefault }) => IsDefault)
    const address = await namecheap.address.getInfo(AddressId)

    // 4. Register the domain using the address.
    const d = new Date().toLocaleString().replace(/[ :]/g, '-')
    const domain = `rqt-example-${d}.com`
    const r = await namecheap.domains.create({
      domain,
      address,
    })
    console.log('Registered:', r, '\n')

    // 5. Retrieve info about domain.
    const info = await namecheap.domains.getInfo(domain)
    console.log('Info:', info, '\n')

    // 6. Get a list of domains (with filter).
    const list = await namecheap.domains.getList({
      filter: domain,
    })
    console.log('List:', list, '\n')
  } catch (err) {
    console.log(err)
  }
})()
```
```js
Check: [ { Domain: 'test.co',
    Available: false,
    ErrorNo: 0,
    Description: '',
    IsPremiumName: false,
    PremiumRegistrationPrice: 0,
    PremiumRenewalPrice: 0,
    PremiumRestorePrice: 0,
    PremiumTransferPrice: 0,
    IcannFee: 0,
    EapFee: '0.0' } ] 

Addresses: [ { AddressId: 0,
    AddressName: 'Primary Address',
    IsDefault: false },
  { AddressId: 101235,
    AddressName: 'Planet Express',
    IsDefault: true } ] 

Registered: { Domain: 'rqt-example-2019-5-15-15-53-14.com',
  Registered: true,
  ChargedAmount: '9.0600',
  DomainID: 404037,
  OrderID: 1483397,
  TransactionID: 2041137,
  WhoisguardEnable: true,
  FreePositiveSSL: false,
  NonRealTimeDomain: false } 

Info: { Status: 'Ok',
  ID: 404037,
  DomainName: 'rqt-example-2019-5-15-15-53-14.com',
  OwnerName: 'zavr',
  IsOwner: true,
  IsPremium: false,
  DomainDetails: 
   { CreatedDate: '05/15/2019',
     ExpiredDate: '05/15/2020',
     NumYears: 0 },
  Whoisguard: 
   { Enabled: 'True',
     ID: 328499,
     ExpiredDate: '05/15/2020',
     EmailDetails: 
      { WhoisGuardEmail: 'a2cbe507f9324f62ac6ba41c566f14cb.protect@whoisguard.com',
        ForwardedTo: 'zoidberg@futurama.bz',
        LastAutoEmailChangeDate: '',
        AutoEmailChangeFrequencyDays: 3 } },
  PremiumDnsSubscription: 
   { UseAutoRenew: false,
     SubscriptionId: -1,
     CreatedDate: 0000-12-31T21:00:00.000Z,
     ExpirationDate: 0000-12-31T21:00:00.000Z,
     IsActive: false },
  DnsDetails: 
   { ProviderType: 'FREE',
     IsUsingOurDNS: true,
     HostCount: 2,
     EmailType: 'FWD',
     DynamicDNSStatus: false,
     IsFailover: false,
     Nameserver: [ 'dns1.registrar-servers.com', 'dns2.registrar-servers.com' ] },
  Modificationrights: { All: true } } 

List: { domains: 
   [ { ID: 404037,
       Name: 'rqt-example-2019-5-15-15-53-14.com',
       User: 'zavr',
       Created: '05/15/2019',
       Expires: '05/15/2020',
       IsExpired: false,
       IsLocked: false,
       AutoRenew: false,
       WhoisGuard: 'ENABLED',
       IsPremium: false,
       IsOurDNS: true } ],
  TotalItems: 1,
  CurrentPage: 1,
  PageSize: 20 }
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true" width="15"></a></p>

## `domains`

Methods to check availability, register and retrieve account domains' info.

<kbd><a href="/doc/DOMAINS.md">Read Doc</a></kbd>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## `users`

Methods related to the user.

### `async getPricing(`<br/>&nbsp;&nbsp;`options: GetPricing,`<br/>`): Pricing`

Returns pricing information for a requested product type.

__<a name="type-getpricing">`GetPricing`</a>__: Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx

|   Name    |                                     Type                                     |                                             Description                                             |
| --------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| __type*__ | <em>('DOMAIN' \| 'SSLCERTIFICATE' \| 'WHOISGUARD')</em>                      | Product Type to get pricing information.                                                            |
| category  | <em>string</em>                                                              | Specific category within a product type, e.g., `DOMAINS`, `COMODO`, `WHOISGUARD`.                   |
| promoCode | <em>string</em>                                                              | Promotional (coupon) code for the user.                                                             |
| action    | <em>('REGISTER' \| 'PURCHASE' \| 'RENEW' \| 'REACTIVATE' \| 'TRANSFER')</em> | Specific action within a product type.                                                              |
| product   | <em>string</em>                                                              | The name of the product within a product type, e.g., `COM`, `INSTANTSSL`, `WHOISGUARD-PROTECT-ONE`. |

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

`Price[]` __<a name="type-product">`Product`</a>__: A product consists of an array of prices for different durations.

__<a name="type-price">`Price`</a>__: Price data for a product accoding to the duration of an action.

|           Name            |        Type         |                                                   Description                                                    |
| ------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| __Duration*__             | <em>number</em>     | The duration of the product, e.g., `1`.                                                                          |
| __DurationType*__         | <em>string</em>     | The duration type of the product, e.g., `YEAR`.                                                                  |
| __Price*__                | <em>string</em>     | Indicates Final price (it can be from regular, userprice, special price,promo price, tier price), e.g., `20.88`. |
| __PricingType*__          | <em>'MULTIPLE'</em> | Always set to `MULTIPLE`.                                                                                        |
| AdditionalCost            | <em>string</em>     | Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.                                 |
| __RegularPrice*__         | <em>string</em>     | Indicates regular price, e.g., `39.00`.                                                                          |
| __RegularPriceType*__     | <em>'MULTIPLE'</em> | Always set to `MULTIPLE`.                                                                                        |
| RegularAdditionalCost     | <em>string</em>     | Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.                                 |
| RegularAdditionalCostType | <em>'MULTIPLE'</em> | Always set to `MULTIPLE`.                                                                                        |
| __YourPrice*__            | <em>string</em>     | The user’s price for the product, e.g., `20.88`.                                                                 |
| __YourPriceType*__        | <em>'MULTIPLE'</em> | Always set to `MULTIPLE`.                                                                                        |
| YourAdditonalCost         | <em>string</em>     | Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.                                 |
| YourAdditonalCostType     | <em>'MULTIPLE'</em> | Always set to `MULTIPLE`.                                                                                        |
| __PromotionPrice*__       | <em>string</em>     | Price with coupon enabled.                                                                                       |
| __Currency*__             | <em>string</em>     | Currency in which the price is listed, e.g., `USD`.                                                              |

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



<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true"></a></p>

## `address`

Methods to manipulate addresses. In contrast to the NameCheap API, it does not fall under the group `users`.





### `async getInfo(`<br/>&nbsp;&nbsp;`id: string|number,`<br/>`): AddressDetail`

Gets information for the requested address ID.

__<a name="type-addressdetail">`AddressDetail`</a>__

|           Name           |      Type       |                        Description                        |
| ------------------------ | --------------- | --------------------------------------------------------- |
| __EmailAddress*__        | <em>string</em> | Email address of the user.                                |
| __FirstName*__           | <em>string</em> | First name of the user.                                   |
| __LastName*__            | <em>string</em> | Last name of the user.                                    |
| JobTitle                 | <em>string</em> | Job designation of the user                               |
| Organization             | <em>string</em> | Organization of the user.                                 |
| __Address1*__            | <em>string</em> | StreetAddress1 of the user.                               |
| Address2                 | <em>string</em> | StreetAddress2 of the user.                               |
| __City*__                | <em>string</em> | City of the user.                                         |
| __StateProvince*__       | <em>string</em> | State/Province of the user.                               |
| __StateProvinceChoice*__ | <em>string</em> | State/Province choice of the user. Either `'S'` or `'P'`. |
| __Zip*__                 | <em>string</em> | Zip/Postal code of the user.                              |
| __Country*__             | <em>string</em> | Two letter country code of the user.                      |
| __Phone*__               | <em>string</em> | Phone number in the format `+NNN.NNNNNNNNNN`.             |
| PhoneExt                 | <em>string</em> | PhoneExt of the user.                                     |
| Fax                      | <em>string</em> | Fax number in the format `+NNN.NNNNNNNNNN`.               |

```js
/**
 * @param {string|number} id The address to get info about.
 * @param {NameCheap} client
 */
const GetInfo = async (id, client) => {
  const res = await client.address.getInfo(id)
  return res
}
```
```js
{ AddressId: 101235,
  UserName: 'zavr',
  AddressName: 'Planet Express',
  Default_YN: true,
  FirstName: 'John',
  LastName: 'Zoidberg',
  JobTitle: 'Doctor',
  Organization: 'Planet Express',
  Address1: 'Planet Express',
  Address2: '57th Street',
  City: 'New New York',
  StateProvince: 'NY',
  StateProvinceChoice: 'S',
  Zip: '10019',
  Country: 'US',
  Phone: '+1.5417543010',
  PhoneExt: '',
  EmailAddress: 'zoidberg@futurama.bz' }
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true" width="15"></a></p>

### `async getList(): Address[]`

Gets a list of address IDs and address names associated with the user account.

__<a name="type-address">`Address`</a>__

|       Name       |       Type       |                         Description                         |
| ---------------- | ---------------- | ----------------------------------------------------------- |
| __AddressId*__   | <em>number</em>  | A unique integer value that represents the address profile. |
| __AddressName*__ | <em>number</em>  | The name of the address profile.                            |
| __IsDefault*__   | <em>boolean</em> | Whether it is a default address.                            |

```js
/**
 * @param {NameCheap} client
 */
const GetList = async (client) => {
  const res = await client.address.getList()
  return res
}
```
```js
[ { AddressId: 0,
    AddressName: 'Primary Address',
    IsDefault: false },
  { AddressId: 101235,
    AddressName: 'Planet Express',
    IsDefault: true } ]
```







<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true"></a></p>

## Progress

* `domains`: 4/11
* `domains.dns`: 0/7
* `domains.ns`: 0/4
* `domains.transfer`: 0/4
* `ssl`: 0/13
* `users`: 1/9
* `users.address`: 2/6
* `whoisguard`: 0/8

---

7/62 = 11%

## Copyright

(c) [Rqt][1] 2018

[1]: https://rqt.biz

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>