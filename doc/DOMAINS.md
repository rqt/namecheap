# `domains`

Methods to check availability, register and retrieve account domains' info.

  * [`async create(options: Create): RegistrationResult`](#async-createoptions-create-registrationresult)
  * [`async check(options: string|Check): DomainCheck[]`](#async-checkoptions-stringcheck-domaincheck)
  * [`async getInfo(options: string|GetInfo): DomainInfo`](#async-getinfooptions-stringgetinfo-domaininfo)
  * [`async getList(options?: GetList): { domains, TotalItems, CurrentPage, PageSize }`](#async-getlistoptions-getlist--domains-totalitems-currentpage-pagesize-)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true" width="25"></a></p>

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
| __address*__      | <em>!AddressDetail</em>                                                                           | A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.address.getList` and `namecheap.address.getInfo`. | -       |
| billingAddress    | <em>!AddressDetail</em>                                                                           | An address to use for `AuxBilling` address details.                                                                                                                             | -       |
| registrantAddress | <em>!AddressDetail</em>                                                                           | An address to use for `Registrant` address details.                                                                                                                             | -       |
| techAddress       | <em>!AddressDetail</em>                                                                           | An address to use for `Tech` address details.                                                                                                                                   | -       |
| adminAddress      | <em>!AddressDetail</em>                                                                           | An address to use for `Admin` address details.                                                                                                                                  | -       |
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
{ Domain: 'rqt-example-2019-5-15-20-17-13.com',
  Registered: true,
  ChargedAmount: '9.0600',
  DomainID: 404224,
  OrderID: 1483962,
  TransactionID: 2041917,
  WhoisguardEnable: true,
  FreePositiveSSL: false,
  NonRealTimeDomain: false }
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true" width="25"></a></p>

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

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true" width="25"></a></p>

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
  ID: 404225,
  DomainName: 'rqt-example-2019-5-15-20-17-30.com',
  OwnerName: 'zavr',
  IsOwner: true,
  IsPremium: false,
  DomainDetails: 
   { CreatedDate: '05/15/2019',
     ExpiredDate: '05/15/2020',
     NumYears: 0 },
  Whoisguard: 
   { Enabled: 'True',
     ID: 328598,
     ExpiredDate: '05/15/2020',
     EmailDetails: 
      { WhoisGuardEmail: 'adcd2dff70d7415b99de7bc948f94449.protect@whoisguard.com',
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

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true" width="25"></a></p>

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
   [ { ID: 404226,
       Name: 'rqt-example-2019-5-15-20-17-43.com',
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

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/4.svg?sanitize=true"></a></p>

<kbd><a href="/">Back To Readme</a></kbd>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>