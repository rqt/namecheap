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

Registered: { Domain: 'rqt-example-2019-5-15-15-42-48.com',
  Registered: true,
  ChargedAmount: '9.0600',
  DomainID: 404029,
  OrderID: 1483391,
  TransactionID: 2041131,
  WhoisguardEnable: true,
  FreePositiveSSL: false,
  NonRealTimeDomain: false } 

Info: { Status: 'Ok',
  ID: 404029,
  DomainName: 'rqt-example-2019-5-15-15-42-48.com',
  OwnerName: 'zavr',
  IsOwner: true,
  IsPremium: false,
  DomainDetails: 
   { CreatedDate: '05/15/2019',
     ExpiredDate: '05/15/2020',
     NumYears: 0 },
  Whoisguard: 
   { Enabled: 'True',
     ID: 328493,
     ExpiredDate: '05/15/2020',
     EmailDetails: 
      { WhoisGuardEmail: '28f39a81ad7d44db97a684aa3f4f1a61.protect@whoisguard.com',
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
   [ { ID: 404029,
       Name: 'rqt-example-2019-5-15-15-42-48.com',
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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true" width="15"></a></p>

### `async create(`<br/>&nbsp;&nbsp;`options: Create,`<br/>`): RegistrationResult`

Register a domain.

__<a name="type-create">`Create`</a>__: Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx

|       Name        |                                               Type                                                |                                                                                   Description                                                                                   | Default |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| __domain*__       | <em>string</em>                                                                                   | The domain name to register.                                                                                                                                                    | -       |
| years             | <em>number</em>                                                                                   | The number of years to register.                                                                                                                                                | `1`     |
| promo             | <em>string</em>                                                                                   | Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.                                                              | -       |
| nameservers       | <em>!Array&lt;string&gt;</em>                                                                     | The comma-separated list of custom nameservers to be associated with the domain name.                                                                                           | -       |
| whois             | <em>boolean</em>                                                                                  | Adds free WhoisGuard for the domain.                                                                                                                                            | `true`  |
| __address*__      | <em>[!AddressDetail](#type-addressdetail)</em>                                                    | A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.address.getList` and `namecheap.address.getInfo`. | -       |
| billingAddress    | <em>[!AddressDetail](#type-addressdetail)</em>                                                    | An address to use for `AuxBilling` address details.                                                                                                                             | -       |
| registrantAddress | <em>[!AddressDetail](#type-addressdetail)</em>                                                    | An address to use for `Registrant` address details.                                                                                                                             | -       |
| techAddress       | <em>[!AddressDetail](#type-addressdetail)</em>                                                    | An address to use for `Tech` address details.                                                                                                                                   | -       |
| adminAddress      | <em>[!AddressDetail](#type-addressdetail)</em>                                                    | An address to use for `Admin` address details.                                                                                                                                  | -       |
| premium           | <em><a href="#type-premiuminfo" title="Information about a premium domain.">!PremiumInfo</a></em> | Information about a premium domain.                                                                                                                                             | -       |

__<a name="type-premiuminfo">`PremiumInfo`</a>__: Information about a premium domain.

|             Name              |       Type       |                                Description                                 |
| ----------------------------- | ---------------- | -------------------------------------------------------------------------- |
| __IsPremiumName*__            | <em>boolean</em> | Indicates whether the domain name is premium.                              |
| __PremiumRegistrationPrice*__ | <em>boolean</em> | The registration price for the premium domain.                             |
| EapFee                        | <em>number</em>  | The purchase fee for the premium domain during Early Access Program (EAP). |

__<a name="type-registrationresult">`RegistrationResult`</a>__: Registered domain information.

|          Name          |       Type       |                               Description                                |
| ---------------------- | ---------------- | ------------------------------------------------------------------------ |
| __ChargedAmount*__     | <em>string</em>  | Total amount charged for registration.                                   |
| __Domain*__            | <em>string</em>  | Domain name that you are trying to register.                             |
| __DomainID*__          | <em>number</em>  | Unique integer value that represents the domain.                         |
| __NonRealTimeDomain*__ | <em>boolean</em> | Indicates whether the domain registration is instant (real-time) or not. |
| __OrderID*__           | <em>number</em>  | Unique integer value that represents the order.                          |
| __Registered*__        | <em>boolean</em> | Indicates whether the domain was registered.                             |
| __TransactionID*__     | <em>number</em>  | Unique integer value that represents the transaction.                    |
| __WhoisguardEnable*__  | <em>boolean</em> | Indicates whether WhoisGuard protection is enabled for the domain.       |

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
{ Domain: 'rqt-example-2019-5-15-15-42-59.com',
  Registered: true,
  ChargedAmount: '9.0600',
  DomainID: 404030,
  OrderID: 1483392,
  TransactionID: 2041132,
  WhoisguardEnable: true,
  FreePositiveSSL: false,
  NonRealTimeDomain: false }
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true" width="15"></a></p>

### `async check(`<br/>&nbsp;&nbsp;`options: string|Check,`<br/>`): DomainCheck[]`

Check a domain or domains for availability.

__<a name="type-check">`Check`</a>__: Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx

|  Name   |             Type              |      Description      |
| ------- | ----------------------------- | --------------------- |
| domain  | <em>string</em>               | The domain check.     |
| domains | <em>!Array&lt;string&gt;</em> | The domains to check. |

__<a name="type-domaincheck">`DomainCheck`</a>__: The result of the check.

|             Name              |       Type       |                               Description                               |
| ----------------------------- | ---------------- | ----------------------------------------------------------------------- |
| __Domain*__                   | <em>string</em>  | The domain name for which you wish to check availability.               |
| __Available*__                | <em>boolean</em> | Indicates whether the domain name is available for registration.        |
| __IsPremiumName*__            | <em>boolean</em> | Indicates whether the domain name is premium.                           |
| __PremiumRegistrationPrice*__ | <em>boolean</em> | The registration price for the premium domain.                          |
| __PremiumRenewalPrice*__      | <em>boolean</em> | The renewal price for the premium domain.                               |
| __PremiumRestorePrice*__      | <em>boolean</em> | The restore price for the premium domain.                               |
| __PremiumTransferPrice*__     | <em>boolean</em> | The transfer price for the premium domain.                              |
| __EapFee*__                   | <em>number</em>  | Purchase fee for the premium domain during Early Access Program (EAP)*. |
| __IcannFee*__                 | <em>number</em>  | Fee charged by ICANN.                                                   |

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

|    Name     |      Type       |                                Description                                 |
| ----------- | --------------- | -------------------------------------------------------------------------- |
| __domain*__ | <em>string</em> | The domain to get info about.                                              |
| host        | <em>string</em> | The hosted domain name for which domain information needs to be requested. |

__<a name="type-domaininfo">`DomainInfo`</a>__

|            Name             |                              Type                               |                                Description                                |
| --------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------- |
| __DomainName*__             | <em>string</em>                                                 | Domain name for which the information was requested, e.g., `example.com`. |
| __OwnerName*__              | <em>string</em>                                                 | User account under which the domain is registered, e.g., `rqt`.           |
| __ID*__                     | <em>number</em>                                                 | Unique integer value that represents the domain,e.g., `314928`.           |
| __IsOwner*__                | <em>boolean</em>                                                | Indicates whether the API user is the owner of the domain, e.g., `true`.  |
| __IsPremium*__              | <em>boolean</em>                                                | Indicates whether the domain name is premium, e.g., `false`.              |
| __Status*__                 | <em>('Ok' \| 'Locked' \| 'Expired')</em>                        | Indicates the status of the domain, e.g., `OK`.                           |
| __DomainDetails*__          | <em>[DomainDetails](#type-domaindetails)</em>                   |                                                                           |
| __LockDetails*__            | <em>[LockDetails](#type-lockdetails)</em>                       |                                                                           |
| __Whoisguard*__             | <em>[Whoisguard](#type-whoisguard)</em>                         |                                                                           |
| __PremiumDnsSubscription*__ | <em>[PremiumDnsSubscription](#type-premiumdnssubscription)</em> |                                                                           |
| __DnsDetails*__             | <em>[DnsDetails](#type-dnsdetails)</em>                         |                                                                           |
| __ModificationRights*__     | <em>[ModificationRights](#type-modificationrights)</em>         |                                                                           |

__<a name="type-domaindetails">`DomainDetails`</a>__

|       Name       |      Type       | Description  |
| ---------------- | --------------- | ------------ |
| __CreatedDate*__ | <em>string</em> | `06/06/2018` |
| __ExpiredDate*__ | <em>string</em> | `06/06/2019` |
| __NumYears*__    | <em>number</em> | 1            |

__<a name="type-lockdetails">`LockDetails`</a>__

__<a name="type-whoisguard">`Whoisguard`</a>__

|       Name        |                    Type                     | Description  |
| ----------------- | ------------------------------------------- | ------------ |
| __Enabled*__      | <em>boolean</em>                            | `true`       |
| __ID*__           | <em>string</em>                             | `264991`     |
| __ExpiredDate*__  | <em>string</em>                             | `06/06/2019` |
| __EmailDetails*__ | <em>[EmailDetails](#type-emaildetails)</em> |              |

__<a name="type-emaildetails">`EmailDetails`</a>__

|               Name                |      Type       |                        Description                        |
| --------------------------------- | --------------- | --------------------------------------------------------- |
| __AutoEmailChangeFrequencyDays*__ | <em>number</em> | `0`                                                       |
| __ForwardedTo*__                  | <em>string</em> | `example@adc.sh`                                          |
| __LastAutoEmailChangeDate*__      | <em>string</em> |                                                           |
| __WhoisGuardEmail*__              | <em>string</em> | `43b596ee817f451f98eab1d848a4051a.protect@whoisguard.com` |

__<a name="type-premiumdnssubscription">`PremiumDnsSubscription`</a>__

|        Name         |       Type       | Description |
| ------------------- | ---------------- | ----------- |
| __CreatedDate*__    | <em>Date</em>    |             |
| __ExpirationDate*__ | <em>Date</em>    |             |
| __IsActive*__       | <em>boolean</em> | `false`     |
| __SubscriptionId*__ | <em>number</em>  | -1          |
| __UseAutoRenew*__   | <em>boolean</em> | `false`     |

__<a name="type-dnsdetails">`DnsDetails`</a>__

|         Name          |             Type              |                        Description                         |
| --------------------- | ----------------------------- | ---------------------------------------------------------- |
| __DynamicDNSStatus*__ | <em>boolean</em>              | `false`                                                    |
| __EmailType*__        | <em>string</em>               | `FWD`                                                      |
| __HostCount*__        | <em>number</em>               | `2`                                                        |
| __IsFailover*__       | <em>boolean</em>              | `false`                                                    |
| __IsUsingOurDNS*__    | <em>boolean</em>              | `true`                                                     |
| __Nameserver*__       | <em>!Array&lt;string&gt;</em> | `[dns1.registrar-servers.com, dns2.registrar-servers.com]` |
| __ProviderType*__     | <em>string</em>               | `CUSTOM` or `FREE`.                                        |

__<a name="type-modificationrights">`ModificationRights`</a>__

|   Name   |       Type       | Description |
| -------- | ---------------- | ----------- |
| __All*__ | <em>boolean</em> | `true`      |
| hosts    | <em>boolean</em> |             |

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
  ID: 404031,
  DomainName: 'rqt-example-2019-5-15-15-43-16.com',
  OwnerName: 'zavr',
  IsOwner: true,
  IsPremium: false,
  DomainDetails: 
   { CreatedDate: '05/15/2019',
     ExpiredDate: '05/15/2020',
     NumYears: 0 },
  Whoisguard: 
   { Enabled: 'True',
     ID: 328495,
     ExpiredDate: '05/15/2020',
     EmailDetails: 
      { WhoisGuardEmail: '2f1cb33dfd214b03a1981b1e3186902d.protect@whoisguard.com',
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
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true" width="15"></a></p>

### `async getList(`<br/>&nbsp;&nbsp;`options?: GetList,`<br/>`): { domains, TotalItems, CurrentPage, PageSize }`

Returns a list of domains for the particular user.

__<a name="type-getlist">`GetList`</a>__: Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx

|   Name   |                    Type                     |                                                     Description                                                      | Default  |
| -------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| type     | <em>('ALL' \| 'EXPIRING' \| 'EXPIRED')</em> | The type of domains.                                                                                                 | `ALL`    |
| filter   | <em>string</em>                             | The keyword to look for in the domain list.                                                                          | -        |
| page     | <em>number</em>                             | The page to return.                                                                                                  | `1`      |
| pageSize | <em>number</em>                             | The number of domains to be listed on a page. Minimum value is 10, and maximum value is 100.                         | `20`     |
| sort     | <em>('name' \| 'expire' \| 'create')</em>   | The field by which to sort domains. If not given, the domains are sorted in descending order by their creation date. | `create` |
| desc     | <em>boolean</em>                            | Whether to sort in descending order.                                                                                 | `false`  |

__<a name="type-domain">`Domain`</a>__

|      Name       |       Type       | Description  |
| --------------- | ---------------- | ------------ |
| __AutoRenew*__  | <em>boolean</em> | `false`      |
| __Created*__    | <em>string</em>  | `07/23/2018` |
| __Expires*__    | <em>string</em>  | `07/23/2019` |
| __ID*__         | <em>number</em>  | `314928`     |
| __IsExpired*__  | <em>boolean</em> | `false`      |
| __IsLocked*__   | <em>boolean</em> | `false`      |
| __IsOurDNS*__   | <em>boolean</em> | `true`       |
| __IsPremium*__  | <em>boolean</em> | `false`      |
| __Name*__       | <em>string</em>  | `domain.app` |
| __User*__       | <em>string</em>  | `user`       |
| __WhoisGuard*__ | <em>string</em>  | `ENABLED`    |

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
   [ { ID: 404032,
       Name: 'rqt-example-2019-5-15-15-43-30.com',
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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/7.svg?sanitize=true"></a></p>

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



<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/8.svg?sanitize=true"></a></p>

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/9.svg?sanitize=true" width="15"></a></p>

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







<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/10.svg?sanitize=true"></a></p>

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