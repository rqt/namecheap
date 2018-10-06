[![namecheap](https://raw.githubusercontent.com/rqt/namecheap/HEAD/images/nc.gif)](https://nameexpensive.com)

# @rqt/namecheap

[![npm version](https://badge.fury.io/js/%40rqt%2Fnamecheap.svg)](https://npmjs.org/package/@rqt/namecheap)

`@rqt/namecheap` is an implementation of the [namecheap.com](https://nameexpensive.com) API.

```sh
yarn add -E @rqt/namecheap
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`constructor(options: Options)`](#constructoroptions-options-void)
  * [`Options`](#type-options)
- [`domains`](#domains)
  * [`async create(options: Create): RegistrationResult`](#async-createoptions-create-registrationresult)
  * [`async check(options: string|Check): DomainCheck[]`](#async-checkoptions-stringcheck-domaincheck)
  * [`async getInfo(options: string|GetInfo): DomainInfo`](#async-getinfooptions-stringgetinfo-domaininfo)
  * [`async getList(options?: GetList): { domains, TotalItems, CurrentPage, PageSize }`](#async-getlistoptions-getlist--domains-totalitems-currentpage-pagesize-)
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

|   Name    |   Type    |                                  Description                                  | Default |
| --------- | --------- | ----------------------------------------------------------------------------- | ------- |
| __user*__ | _string_  | The username required to access the API.                                      | -       |
| __key*__  | _string_  | The password required used to access the API.                                 | -       |
| __ip*__   | _string_  | The IP address of the client accessing the application (End-user IP address). | -       |
| sandbox   | _boolean_ | Whether to use the sandbox version of the API.                                | `false` |

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

Registered: { Domain: 'rqt-example-2018-10-6-22-49-04.com',
  Registered: true,
  ChargedAmount: '9.0600',
  DomainID: 330665,
  OrderID: 1293691,
  TransactionID: 1831272,
  WhoisguardEnable: true,
  FreePositiveSSL: false,
  NonRealTimeDomain: false } 

Info: { Status: 'Ok',
  ID: 330665,
  DomainName: 'rqt-example-2018-10-6-22-49-04.com',
  OwnerName: 'zavr',
  IsOwner: true,
  IsPremium: false,
  DomainDetails: 
   { CreatedDate: '10/06/2018',
     ExpiredDate: '10/06/2019',
     NumYears: 0 },
  Whoisguard: 
   { Enabled: 'True',
     ID: 269176,
     ExpiredDate: '10/06/2019',
     EmailDetails: 
      { WhoisGuardEmail: '68c19235241b4d878ed1bf75e709d4c5.protect@whoisguard.com',
        ForwardedTo: 'zoidberg@futurama.bz',
        LastAutoEmailChangeDate: '',
        AutoEmailChangeFrequencyDays: 0 } },
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
   [ { ID: 330665,
       Name: 'rqt-example-2018-10-6-22-49-04.com',
       User: 'zavr',
       Created: '10/06/2018',
       Expires: '10/06/2019',
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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true" width="15"></a></p>

### `async create(`<br/>&nbsp;&nbsp;`options: Create,`<br/>`): RegistrationResult`

Register a domain.

__<a name="type-create">`Create`</a>__: Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx

|       Name        |                  Type                  |                                                                                   Description                                                                                   | Default |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| __domain*__       | _string_                               | The domain name to register.                                                                                                                                                    | -       |
| years             | _number_                               | The number of years to register.                                                                                                                                                | `1`     |
| promo             | _string_                               | Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.                                                              | -       |
| nameservers       | _string[]_                             | The comma-separated list of custom nameservers to be associated with the domain name.                                                                                           | -       |
| whois             | _boolean_                              | Adds free WhoisGuard for the domain.                                                                                                                                            | `true`  |
| __address*__      | _[AddressDetail](#type-addressdetail)_ | A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.address.getList` and `namecheap.address.getInfo`. | -       |
| billingAddress    | _[AddressDetail](#type-addressdetail)_ | An address to use for `AuxBilling` address details.                                                                                                                             | -       |
| registrantAddress | _[AddressDetail](#type-addressdetail)_ | An address to use for `Registrant` address details.                                                                                                                             | -       |
| techAddress       | _[AddressDetail](#type-addressdetail)_ | An address to use for `Tech` address details.                                                                                                                                   | -       |
| adminAddress      | _[AddressDetail](#type-addressdetail)_ | An address to use for `Admin` address details.                                                                                                                                  | -       |

__<a name="type-registrationresult">`RegistrationResult`</a>__: Registered domain information.

|          Name          |   Type    |                               Description                                |
| ---------------------- | --------- | ------------------------------------------------------------------------ |
| __ChargedAmount*__     | _string_  | Total amount charged for registration.                                   |
| __Domain*__            | _string_  | Domain name that you are trying to register.                             |
| __DomainID*__          | _number_  | Unique integer value that represents the domain.                         |
| __NonRealTimeDomain*__ | _boolean_ | Indicates whether the domain registration is instant (real-time) or not. |
| __OrderID*__           | _number_  | Unique integer value that represents the order.                          |
| __Registered*__        | _boolean_ | Indicates whether the domain was registered.                             |
| __TransactionID*__     | _number_  | Unique integer value that represents the transaction.                    |
| __WhoisguardEnable*__  | _boolean_ | Indicates whether WhoisGuard protection is enabled for the domain.       |

```js
/**
 * @param {string} domain The domain to register.
 * @param {NameCheap} client
 */
const Create = async (domain, client) => {
  // Find the default address.
  const ad = await client.address.getList()
  const { AddressId } = ad.find(({ IsDefault }) => IsDefault)
  const address = await client.address.getInfo(AddressId)

  // Register a domain.
  const res = await client.domains.create({
    domain,
    address,
  })
  return res
}
```
```js
{ Domain: 'rqt-example-2018-10-6-22-49-14.com',
  Registered: true,
  ChargedAmount: '9.0600',
  DomainID: 330666,
  OrderID: 1293692,
  TransactionID: 1831273,
  WhoisguardEnable: true,
  FreePositiveSSL: false,
  NonRealTimeDomain: false }
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true" width="15"></a></p>

### `async check(`<br/>&nbsp;&nbsp;`options: string|Check,`<br/>`): DomainCheck[]`

Check a domain or domains for availability.

__<a name="type-check">`Check`</a>__: Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx

|  Name   |    Type    |      Description      |
| ------- | ---------- | --------------------- |
| domain  | _string_   | The domain check.     |
| domains | _string[]_ | The domains to check. |

__<a name="type-domaincheck">`DomainCheck`</a>__: The result of the check.

|             Name              |   Type    |                               Description                               |
| ----------------------------- | --------- | ----------------------------------------------------------------------- |
| __Domain*__                   | _string_  | The domain name for which you wish to check availability.               |
| __Available*__                | _boolean_ | Indicates whether the domain name is available for registration.        |
| __IsPremiumName*__            | _boolean_ | Indicates whether the domain name is premium.                           |
| __PremiumRegistrationPrice*__ | _boolean_ | The registration price for the premium domain.                          |
| __PremiumRenewalPrice*__      | _boolean_ | The renewal price for the premium domain.                               |
| __PremiumRestorePrice*__      | _boolean_ | The restore price for the premium domain.                               |
| __PremiumTransferPrice*__     | _boolean_ | The transfer price for the premium domain.                              |
| __EapFee*__                   | _number_  | Purchase fee for the premium domain during Early Access Program (EAP)*. |
| __IcannFee*__                 | _number_  | Fee charged by ICANN.                                                   |

```js
/**
 * @param {string} domain The domain to check.
 * @param {NameCheap} client
 */
const Check = async (domain, client) => {
  // Check a domain with options (returned in an array).
  await client.domains.check({
    domain,
  })

  // Check a domain with string (returned in an array).
  await client.domains.check(domain)

  // Check multiple domains.
  const array = await client.domains.check({
    domains: [
      domain,
      domain.replace('.com', '.net'),
    ],
  })

  return array
}
```
```js
[ { Domain: 'example.com',
    Available: false,
    ErrorNo: 0,
    Description: '',
    IsPremiumName: false,
    PremiumRegistrationPrice: 0,
    PremiumRenewalPrice: 0,
    PremiumRestorePrice: 0,
    PremiumTransferPrice: 0,
    IcannFee: 0,
    EapFee: '0.0' },
  { Domain: 'example.net',
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
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true" width="15"></a></p>

### `async getInfo(`<br/>&nbsp;&nbsp;`options: string|GetInfo,`<br/>`): DomainInfo`

Returns information about the requested domain.

__<a name="type-getinfo">`GetInfo`</a>__: Options to get info about a domain. https://www.namecheap.com/support/api/methods/domains/get-info.aspx

|    Name     |   Type   |                                Description                                 |
| ----------- | -------- | -------------------------------------------------------------------------- |
| __domain*__ | _string_ | The domain to get info about.                                              |
| host        | _string_ | The hosted domain name for which domain information needs to be requested. |

__<a name="type-domaininfo">`DomainInfo`</a>__

|            Name             |                           Type                           |                                Description                                |
| --------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| __DomainName*__             | _string_                                                 | Domain name for which the information was requested, e.g., `example.com`. |
| __OwnerName*__              | _string_                                                 | User account under which the domain is registered, e.g., `rqt`.           |
| __ID*__                     | _number_                                                 | Unique integer value that represents the domain,e.g., `314928`.           |
| __IsOwner*__                | _boolean_                                                | Indicates whether the API user is the owner of the domain, e.g., `true`.  |
| __IsPremium*__              | _boolean_                                                | Indicates whether the domain name is premium, e.g., `false`.              |
| __Status*__                 | _'Ok'\|'Locked'\|'Expired'_                              | Indicates the status of the domain, e.g., `OK`.                           |
| __DomainDetails*__          | _[DomainDetails](#type-domaindetails)_                   |                                                                           |
| __LockDetails*__            | _[LockDetails](#type-lockdetails)_                       |                                                                           |
| __Whoisguard*__             | _[Whoisguard](#type-whoisguard)_                         |                                                                           |
| __PremiumDnsSubscription*__ | _[PremiumDnsSubscription](#type-premiumdnssubscription)_ |                                                                           |
| __DnsDetails*__             | _[DnsDetails](#type-dnsdetails)_                         |                                                                           |
| __ModificationRights*__     | _[ModificationRights](#type-modificationrights)_         |                                                                           |

__<a name="type-domaindetails">`DomainDetails`</a>__

|       Name       |   Type   | Description  |
| ---------------- | -------- | ------------ |
| __CreatedDate*__ | _string_ | `06/06/2018` |
| __ExpiredDate*__ | _string_ | `06/06/2019` |
| __NumYears*__    | _number_ | 1            |

__<a name="type-lockdetails">`LockDetails`</a>__

__<a name="type-whoisguard">`Whoisguard`</a>__

|       Name        |                 Type                 | Description  |
| ----------------- | ------------------------------------ | ------------ |
| __Enabled*__      | _boolean_                            | `true`       |
| __ID*__           | _string_                             | `264991`     |
| __ExpiredDate*__  | _string_                             | `06/06/2019` |
| __EmailDetails*__ | _[EmailDetails](#type-emaildetails)_ |              |

__<a name="type-emaildetails">`EmailDetails`</a>__

|               Name                |   Type   |                        Description                        |
| --------------------------------- | -------- | --------------------------------------------------------- |
| __AutoEmailChangeFrequencyDays*__ | _number_ | `0`                                                       |
| __ForwardedTo*__                  | _string_ | `example@adc.sh`                                          |
| __LastAutoEmailChangeDate*__      | _string_ |                                                           |
| __WhoisGuardEmail*__              | _string_ | `43b596ee817f451f98eab1d848a4051a.protect@whoisguard.com` |

__<a name="type-premiumdnssubscription">`PremiumDnsSubscription`</a>__

|        Name         |   Type    | Description |
| ------------------- | --------- | ----------- |
| __CreatedDate*__    | _Date_    |             |
| __ExpirationDate*__ | _Date_    |             |
| __IsActive*__       | _boolean_ | `false`     |
| __SubscriptionId*__ | _number_  | -1          |
| __UseAutoRenew*__   | _boolean_ | `false`     |

__<a name="type-dnsdetails">`DnsDetails`</a>__

|         Name          |        Type        |                        Description                         |
| --------------------- | ------------------ | ---------------------------------------------------------- |
| __DynamicDNSStatus*__ | _boolean_          | `false`                                                    |
| __EmailType*__        | _string_           | `FWD`                                                      |
| __HostCount*__        | _number_           | `2`                                                        |
| __IsFailover*__       | _boolean_          | `false`                                                    |
| __IsUsingOurDNS*__    | _boolean_          | `true`                                                     |
| __Nameserver*__       | _string[]_         | `[dns1.registrar-servers.com, dns2.registrar-servers.com]` |
| __ProviderType*__     | _'CUSTOM'\|'FREE'_ | `FREE`                                                     |

__<a name="type-modificationrights">`ModificationRights`</a>__

|   Name   |   Type    | Description |
| -------- | --------- | ----------- |
| __All*__ | _boolean_ | `true`      |
| hosts    | _boolean_ |             |

```js
/**
 * @param {string} domain The domain to get info about.
 * @param {NameCheap} client
 */
const GetInfo = async (domain, client) => {
  // Info with options.
  await client.domains.getInfo({ domain })

  // Simplified info with a string.
  const res = await client.domains.getInfo(domain)
  return res
}
```
```js
{ Status: 'Ok',
  ID: 330667,
  DomainName: 'rqt-example-2018-10-6-22-49-29.com',
  OwnerName: 'zavr',
  IsOwner: true,
  IsPremium: false,
  DomainDetails: 
   { CreatedDate: '10/06/2018',
     ExpiredDate: '10/06/2019',
     NumYears: 0 },
  Whoisguard: 
   { Enabled: 'True',
     ID: 269178,
     ExpiredDate: '10/06/2019',
     EmailDetails: 
      { WhoisGuardEmail: 'b4328857744543919dd30217b9bcdee6.protect@whoisguard.com',
        ForwardedTo: 'zoidberg@futurama.bz',
        LastAutoEmailChangeDate: '',
        AutoEmailChangeFrequencyDays: 0 } },
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
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true" width="15"></a></p>

### `async getList(`<br/>&nbsp;&nbsp;`options?: GetList,`<br/>`): { domains, TotalItems, CurrentPage, PageSize }`

Returns a list of domains for the particular user.

__<a name="type-getlist">`GetList`</a>__: Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx

|   Name   |              Type              |                                                     Description                                                      | Default  |
| -------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- | -------- |
| type     | _'ALL'\|'EXPIRING'\|'EXPIRED'_ | The type of domains.                                                                                                 | `ALL`    |
| filter   | _string_                       | The keyword to look for in the domain list.                                                                          | -        |
| page     | _number_                       | The page to return.                                                                                                  | `1`      |
| pageSize | _number_                       | The number of domains to be listed on a page. Minimum value is 10, and maximum value is 100.                         | `20`     |
| sort     | _'name'\|'expire'\|'create'_   | The field by which to sort domains. If not given, the domains are sorted in descending order by their creation date. | `create` |
| desc     | _boolean_                      | Whether to sort in descending order.                                                                                 | `false`  |

__<a name="type-domain">`Domain`</a>__

|      Name       |   Type    | Description  |
| --------------- | --------- | ------------ |
| __AutoRenew*__  | _boolean_ | `false`      |
| __Created*__    | _string_  | `07/23/2018` |
| __Expires*__    | _string_  | `07/23/2019` |
| __ID*__         | _number_  | `314928`     |
| __IsExpired*__  | _boolean_ | `false`      |
| __IsLocked*__   | _boolean_ | `false`      |
| __IsOurDNS*__   | _boolean_ | `true`       |
| __IsPremium*__  | _boolean_ | `false`      |
| __Name*__       | _string_  | `domain.app` |
| __User*__       | _string_  | `user`       |
| __WhoisGuard*__ | _string_  | `ENABLED`    |

```js
/**
 * @param {string} domain The domain to filter by.
 * @param {NameCheap} client
 */
const GetList = async (domain, client) => {
  const res = await client.domains.getList({
    filter: domain,
  })
  return res
}
```
```js
{ domains: 
   [ { ID: 330668,
       Name: 'rqt-example-2018-10-6-22-49-41.com',
       User: 'zavr',
       Created: '10/06/2018',
       Expires: '10/06/2019',
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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/7.svg?sanitize=true"></a></p>

## `users`

Methods related to the user.

### `async getPricing(`<br/>&nbsp;&nbsp;`options: GetPricing,`<br/>`): Pricing`

Returns pricing information for a requested product type.

__<a name="type-getpricing">`GetPricing`</a>__: Options to get pricing info. https://www.namecheap.com/support/api/methods/users/get-pricing.aspx

|   Name    |                            Type                             |                                             Description                                             |
| --------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| __type*__ | _'DOMAIN'\|'SSLCERTIFICATE'\|'WHOISGUARD'_                  | Product Type to get pricing information.                                                            |
| category  | _string_                                                    | Specific category within a product type, e.g., `DOMAINS`, `COMODO`, `WHOISGUARD`.                   |
| promoCode | _string_                                                    | Promotional (coupon) code for the user.                                                             |
| action    | _'REGISTER'\|'PURCHASE'\|'RENEW'\|'REACTIVATE'\|'TRANSFER'_ | Specific action within a product type.                                                              |
| product   | _string_                                                    | The name of the product within a product type, e.g., `COM`, `INSTANTSSL`, `WHOISGUARD-PROTECT-ONE`. |

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

|      Name       |                  Type                  |           Description           |
| --------------- | -------------------------------------- | ------------------------------- |
| __domain*__     | _[DomainPricing](#type-domainpricing)_ | The pricing of domains.         |
| __ssl*__        | _[SSLPricing](#type-sslpricing)_       | The pricing of certificates.    |
| __whoisguard*__ | _[WhoisPricing](#type-whoispricing)_   | The pricing of the Whois Guard. |

`Price[]` __<a name="type-product">`Product`</a>__: A product consists of an array of prices for different durations.

__<a name="type-price">`Price`</a>__: Price data for a product accoding to the duration of an action.

|           Name            |     Type     |                                                   Description                                                    |
| ------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| __Duration*__             | _number_     | The duration of the product, e.g., `1`.                                                                          |
| __DurationType*__         | _string_     | The duration type of the product, e.g., `YEAR`.                                                                  |
| __Price*__                | _string_     | Indicates Final price (it can be from regular, userprice, special price,promo price, tier price), e.g., `20.88`. |
| __PricingType*__          | _'MULTIPLE'_ | Always set to `MULTIPLE`.                                                                                        |
| AdditionalCost            | _string_     | Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.                                 |
| __RegularPrice*__         | _string_     | Indicates regular price, e.g., `39.00`.                                                                          |
| __RegularPriceType*__     | _'MULTIPLE'_ | Always set to `MULTIPLE`.                                                                                        |
| RegularAdditionalCost     | _string_     | Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.                                 |
| RegularAdditionalCostType | _'MULTIPLE'_ | Always set to `MULTIPLE`.                                                                                        |
| __YourPrice*__            | _string_     | The user’s price for the product, e.g., `20.88`.                                                                 |
| __YourPriceType*__        | _'MULTIPLE'_ | Always set to `MULTIPLE`.                                                                                        |
| YourAdditonalCost         | _string_     | Any additional costs, such as ICANN fee for a domain registration, e.g., `0.18`.                                 |
| YourAdditonalCostType     | _'MULTIPLE'_ | Always set to `MULTIPLE`.                                                                                        |
| __PromotionPrice*__       | _string_     | Price with coupon enabled.                                                                                       |
| __Currency*__             | _string_     | Currency in which the price is listed, e.g., `USD`.                                                              |

__<a name="type-domainpricing">`DomainPricing`</a>__: The pricing of domains as an object, where the requested zone is a key.

|      Name       |                       Type                        |            Description             |
| --------------- | ------------------------------------------------- | ---------------------------------- |
| __register*__   | _Object.&lt;string, [Product](#type-product)&gt;_ | The pricing to register domains.   |
| __renew*__      | _Object.&lt;string, [Product](#type-product)&gt;_ | The pricing to renew domains.      |
| __reactivate*__ | _Object.&lt;string, [Product](#type-product)&gt;_ | The pricing to reactivate domains. |
| __transfer*__   | _Object.&lt;string, [Product](#type-product)&gt;_ | The pricing to transfer domains.   |

__<a name="type-sslpricing">`SSLPricing`</a>__: The pricing of certificates.

|     Name      |                Type                |              Description              |
| ------------- | ---------------------------------- | ------------------------------------- |
| __purchase*__ | _[SSLPurchase](#type-sslpurchase)_ | The pricing to purchase certificates. |
| __renew*__    | _[SSLRenew](#type-sslrenew)_       | The pricing to renew certificates.    |

<details>
<summary>Show SSL Product Pricing</summary>

__<a name="type-sslpurchase">`SSLPurchase`</a>__: The pricing to purchase certificates.

|                     Name                     |            Type            |                                                                    Description                                                                    |
| -------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| __instantssl*__                              | _[Product](#type-product)_ | _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year purchase: `20.88 USD`                             |
| __positivessl*__                             | _[Product](#type-product)_ | _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year purchase: `8.88 USD`                            |
| __positivesslWildcard*__                     | _[Product](#type-product)_ | _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year purchase: `76.88 USD`         |
| __premiumssl*__                              | _[Product](#type-product)_ | _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year purchase: `79.00 USD`                             |
| __quicksslPremium*__                         | _[Product](#type-product)_ | 1-year purchase: `56.88 USD`                                                                                                                      |
| __rapidssl*__                                | _[Product](#type-product)_ | 1-year purchase: `10.95 USD`                                                                                                                      |
| __rapidsslWildcard*__                        | _[Product](#type-product)_ | 1-year purchase: `148.88 USD`                                                                                                                     |
| __secureSite*__                              | _[Product](#type-product)_ | 1-year purchase: `285.88 USD`                                                                                                                     |
| __secureSitePro*__                           | _[Product](#type-product)_ | 1-year purchase: `675.88 USD`                                                                                                                     |
| __secureSiteProWithEv*__                     | _[Product](#type-product)_ | 1-year purchase: `961.88 USD`                                                                                                                     |
| __secureSiteWithEv*__                        | _[Product](#type-product)_ | 1-year purchase: `666.88 USD`                                                                                                                     |
| __trueBusinessid*__                          | _[Product](#type-product)_ | 1-year purchase: `98.00 USD`                                                                                                                      |
| __trueBusinessidWildcard*__                  | _[Product](#type-product)_ | 1-year purchase: `389.00 USD`                                                                                                                     |
| __trueBusinessidWithEv*__                    | _[Product](#type-product)_ | 1-year purchase: `179.00 USD`                                                                                                                     |
| __premiumsslWildcard*__                      | _[Product](#type-product)_ | _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year purchase: `169.00 USD`          |
| __essentialssl*__                            | _[Product](#type-product)_ | _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year purchase: `18.88 USD`                         |
| __essentialsslWildcard*__                    | _[Product](#type-product)_ | _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year purchase: `74.88 USD`       |
| __evSsl*__                                   | _[Product](#type-product)_ | _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year purchase: `78.88 USD`                                         |
| __instantsslPro*__                           | _[Product](#type-product)_ | _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year purchase: `38.88 USD`                     |
| __ssl123*__                                  | _[Product](#type-product)_ | 1-year purchase: `39.00 USD`                                                                                                                      |
| __sslWebServer*__                            | _[Product](#type-product)_ | 1-year purchase: `88.88 USD`                                                                                                                      |
| __sslWebserverEv*__                          | _[Product](#type-product)_ | 1-year purchase: `163.88 USD`                                                                                                                     |
| __comodossl*__                               | _[Product](#type-product)_ | 1-year purchase: `35.00 USD`                                                                                                                      |
| __comodosslWildcard*__                       | _[Product](#type-product)_ | 1-year purchase: `170.00 USD`                                                                                                                     |
| __comodosslMultiDomainSsl*__                 | _[Product](#type-product)_ | _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year purchase: `89.88 USD`                 |
| __comodosslMultiDomainSslMoresans*__         | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __comodosslEvMultiDomainSsl*__               | _[Product](#type-product)_ | _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year purchase: `168.88 USD`          |
| __comodosslEvMultiDomainSslMoresans*__       | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __positivesslMultiDomain*__                  | _[Product](#type-product)_ | _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year purchase: `29.88 USD` |
| __positivesslMultiDomainMoresans*__          | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __trueBusinessidMultiDomain*__               | _[Product](#type-product)_ | 1-year purchase: `179.88 USD`                                                                                                                     |
| __trueBusinessidMultiDomainMoresans*__       | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __trueBusinessidWithEvMultiDomain*__         | _[Product](#type-product)_ | 1-year purchase: `237.88 USD`                                                                                                                     |
| __trueBusinessidWithEvMultiDomainMoresans*__ | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __unifiedCommunications*__                   | _[Product](#type-product)_ | _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year purchase: `89.88 USD`     |
| __unifiedCommunicationsMoresans*__           | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __secureSiteMoresans*__                      | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __quicksslPremiumMoresans*__                 | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __secureSiteProMoresans*__                   | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __secureSiteProWithEvMoresans*__             | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __secureSiteWithEvMoresans*__                | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __sgcSuperCertsMoresans*__                   | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __sslWebServerMoresans*__                    | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |
| __sslWebserverEvMoresans*__                  | _[Product](#type-product)_ | 1-year purchase: `0.00 USD`                                                                                                                       |

__<a name="type-sslrenew">`SSLRenew`</a>__: The pricing to renew certificates.

|                 Name                 |            Type            |                                                                   Description                                                                    |
| ------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| __instantssl*__                      | _[Product](#type-product)_ | _InstantSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl.aspx. 1-year renewal: `31.98 USD`                             |
| __positivessl*__                     | _[Product](#type-product)_ | _PositiveSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl.aspx. 1-year renewal: `7.28 USD`                            |
| __positivesslWildcard*__             | _[Product](#type-product)_ | _PositiveSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-wildcard.aspx. 1-year renewal: `77.08 USD`         |
| __premiumssl*__                      | _[Product](#type-product)_ | _PremiumSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl.aspx. 1-year renewal: `64.78 USD`                             |
| __quicksslPremium*__                 | _[Product](#type-product)_ | 1-year renewal: `46.64 USD`                                                                                                                      |
| __rapidssl*__                        | _[Product](#type-product)_ | 1-year renewal: `8.98 USD`                                                                                                                       |
| __rapidsslWildcard*__                | _[Product](#type-product)_ | 1-year renewal: `122.08 USD`                                                                                                                     |
| __secureSite*__                      | _[Product](#type-product)_ | 1-year renewal: `234.42 USD`                                                                                                                     |
| __secureSitePro*__                   | _[Product](#type-product)_ | 1-year renewal: `554.22 USD`                                                                                                                     |
| __secureSiteProWithEv*__             | _[Product](#type-product)_ | 1-year renewal: `788.74 USD`                                                                                                                     |
| __secureSiteWithEv*__                | _[Product](#type-product)_ | 1-year renewal: `546.84 USD`                                                                                                                     |
| __trueBusinessid*__                  | _[Product](#type-product)_ | 1-year renewal: `80.36 USD`                                                                                                                      |
| __trueBusinessidWildcard*__          | _[Product](#type-product)_ | 1-year renewal: `318.98 USD`                                                                                                                     |
| __trueBusinessidWithEv*__            | _[Product](#type-product)_ | 1-year renewal: `146.78 USD`                                                                                                                     |
| __ssl123*__                          | _[Product](#type-product)_ | 1-year renewal: `31.98 USD`                                                                                                                      |
| __sslWebServer*__                    | _[Product](#type-product)_ | 1-year renewal: `72.88 USD`                                                                                                                      |
| __sslWebserverEv*__                  | _[Product](#type-product)_ | 1-year renewal: `134.38 USD`                                                                                                                     |
| __essentialssl*__                    | _[Product](#type-product)_ | _EssentialSSL_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl.aspx. 1-year renewal: `18.88 USD`                         |
| __essentialsslWildcard*__            | _[Product](#type-product)_ | _EssentialSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/essentialssl-wildcard.aspx. 1-year renewal: `74.88 USD`       |
| __evSsl*__                           | _[Product](#type-product)_ | _EV SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev.aspx. 1-year renewal: `118.90 USD`                                        |
| __instantsslPro*__                   | _[Product](#type-product)_ | _InstantSSL Pro_ https://www.namecheap.com/security/ssl-certificates/comodo/instantssl-pro.aspx. 1-year renewal: `48.38 USD`                     |
| __premiumsslWildcard*__              | _[Product](#type-product)_ | _PremiumSSL Wildcard_ https://www.namecheap.com/security/ssl-certificates/comodo/premiumssl-wildcard.aspx. 1-year renewal: `138.58 USD`          |
| __comodossl*__                       | _[Product](#type-product)_ | 1-year renewal: `28.70 USD`                                                                                                                      |
| __comodosslMultiDomainSsl*__         | _[Product](#type-product)_ | _Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/multi-domain-ssl.aspx. 1-year renewal: `73.70 USD`                 |
| __comodosslEvMultiDomainSsl*__       | _[Product](#type-product)_ | _EV Multi-Domain SSL_ https://www.namecheap.com/security/ssl-certificates/comodo/ev-multi-domain-ssl.aspx. 1-year renewal: `203.26 USD`          |
| __positivesslMultiDomain*__          | _[Product](#type-product)_ | _PositiveSSL Multi-Domain_ https://www.namecheap.com/security/ssl-certificates/comodo/positivessl-multi-domain.aspx. 1-year renewal: `24.50 USD` |
| __trueBusinessidMultiDomain*__       | _[Product](#type-product)_ | 1-year renewal: `147.50 USD`                                                                                                                     |
| __trueBusinessidWithEvMultiDomain*__ | _[Product](#type-product)_ | 1-year renewal: `195.06 USD`                                                                                                                     |
| __unifiedCommunications*__           | _[Product](#type-product)_ | _Unified Communications_ https://www.namecheap.com/security/ssl-certificates/comodo/unified-communications.aspx. 1-year renewal: `73.70 USD`     |
</details>
<br/>

__<a name="type-whoispricing">`WhoisPricing`</a>__: The pricing of the Whois Guard.

|     Name      |                  Type                  |              Description              |
| ------------- | -------------------------------------- | ------------------------------------- |
| __purchase*__ | _[WhoisPurchase](#type-whoispurchase)_ | The pricing to purchase WHOIS guards. |
| __renew*__    | _[WhoisRenew](#type-whoisrenew)_       | The pricing to renew WHOIS guards.    |

<details>
<summary>Show Whois Product Pricing</summary>

__<a name="type-whoispurchase">`WhoisPurchase`</a>__: The pricing to purchase WHOIS guards.

|           Name            |            Type            |         Description         |
| ------------------------- | -------------------------- | --------------------------- |
| __whoisguard5Pack*__      | _[Product](#type-product)_ | 1-year purchase: `7.88 USD` |
| __whoisguardDualPack*__   | _[Product](#type-product)_ | 1-year purchase: `4.88 USD` |
| __whoisguardProtectOne*__ | _[Product](#type-product)_ | 1-year purchase: `0.00 USD` |

__<a name="type-whoisrenew">`WhoisRenew`</a>__: The pricing to renew WHOIS guards.

|           Name            |            Type            |        Description         |
| ------------------------- | -------------------------- | -------------------------- |
| __whoisguardProtectOne*__ | _[Product](#type-product)_ | 1-year renewal: `0.00 USD` |
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



<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/8.svg?sanitize=true"></a></p>

## `address`

Methods to manipulate addresses. In contrast to the NameCheap API, it does not fall under the group `users`.





### `async getInfo(`<br/>&nbsp;&nbsp;`id: string|number,`<br/>`): AddressDetail`

Gets information for the requested address ID.

__<a name="type-addressdetail">`AddressDetail`</a>__

|           Name           |    Type    |                  Description                  |
| ------------------------ | ---------- | --------------------------------------------- |
| __EmailAddress*__        | _string_   | Email address of the user.                    |
| __FirstName*__           | _string_   | First name of the user.                       |
| __LastName*__            | _string_   | Last name of the user.                        |
| JobTitle                 | _string_   | Job designation of the user                   |
| Organization             | _string_   | Organization of the user.                     |
| __Address1*__            | _string_   | StreetAddress1 of the user.                   |
| Address2                 | _string_   | StreetAddress2 of the user.                   |
| __City*__                | _string_   | City of the user.                             |
| __StateProvince*__       | _string_   | State/Province of the user.                   |
| __StateProvinceChoice*__ | _'S'\|'P'_ | State/Province choice of the user.            |
| __Zip*__                 | _string_   | Zip/Postal code of the user.                  |
| __Country*__             | _string_   | Two letter country code of the user.          |
| __Phone*__               | _string_   | Phone number in the format `+NNN.NNNNNNNNNN`. |
| PhoneExt                 | _string_   | PhoneExt of the user.                         |
| Fax                      | _string_   | Fax number in the format `+NNN.NNNNNNNNNN`.   |

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/9.svg?sanitize=true" width="15"></a></p>

### `async getList(): Address[]`

Gets a list of address IDs and address names associated with the user account.

__<a name="type-address">`Address`</a>__

|       Name       |   Type    |                         Description                         |
| ---------------- | --------- | ----------------------------------------------------------- |
| __AddressId*__   | _number_  | A unique integer value that represents the address profile. |
| __AddressName*__ | _number_  | The name of the address profile.                            |
| __IsDefault*__   | _boolean_ | Whether it is a default address.                            |

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







<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/10.svg?sanitize=true"></a></p>

## Progress

* `domains`: 4/11
* `domains.dns`: 0/7
* `domains.ns`: 0/4
* `domains.transfer`: 0/4
* `ssl`: 0/13
* `users`: 0/9
* `users.address`: 2/6
* `whoisguard`: 0/8

---

6/62 = 10%

## Copyright

(c) [Rqt][1] 2018

[1]: https://rqt.biz

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>