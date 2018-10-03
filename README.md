[![namecheap](https://raw.githubusercontent.com/rqt/namecheap/HEAD/images/nc.gif)](https://affiliate.namecheap.com/?affId=70782)

# @rqt/namecheap

[![npm version](https://badge.fury.io/js/%40rqt%2Fnamecheap.svg)](https://npmjs.org/package/@rqt/namecheap)

`@rqt/namecheap` is an implementation of the [namecheap.com](https://affiliate.namecheap.com/?affId=70782) API.

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
    * [`GetInfo`](#type-getinfo)
    * [`DomainInfo`](#type-domaininfo)
    * [`DomainDetails`](#type-domaindetails)
  * [`async getInfo(options: string|GetInfo): DomainInfo`](#async-getinfooptions-stringgetinfo-domaininfo)
    * [`LockDetails`](#type-lockdetails)
    * [`Whoisguard`](#type-whoisguard)
    * [`EmailDetails`](#type-emaildetails)
    * [`PremiumDnsSubscription`](#type-premiumdnssubscription)
    * [`DnsDetails`](#type-dnsdetails)
    * [`ModificationRights`](#type-modificationrights)
    * [`GetList`](#type-getlist)
    * [`Domain`](#type-domain)
  * [`async getList(options?: GetList): { domains, TotalItems, CurrentPage, PageSize }`](#async-getlistoptions-getlist--domains-totalitems-currentpage-pagesize-)
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
    const cc = await namecheap.users.address.getList()
    console.log('Addresses:', cc, '\n')

    // 3. Find the default address and get its info.
    const { AddressId } = cc.find(({ IsDefault }) => IsDefault)
    const address = await namecheap.users.address.getInfo(AddressId)

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
```
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

Addresses: [ { AddressId: 0, AddressName: 'Primary Address', IsDefault: true } ] 

Registered: { Domain: 'rqt-example-2018-10-3-22-53-24.com',
  Registered: true,
  ChargedAmount: '9.0600',
  DomainID: 330335,
  OrderID: 1292544,
  TransactionID: 1829920,
  WhoisguardEnable: true,
  FreePositiveSSL: false,
  NonRealTimeDomain: false } 

Info: { Status: 'Ok',
  ID: 330335,
  DomainName: 'rqt-example-2018-10-3-22-53-24.com',
  OwnerName: 'zavr',
  IsOwner: true,
  IsPremium: false,
  DomainDetails: 
   { CreatedDate: '10/03/2018',
     ExpiredDate: '10/03/2019',
     NumYears: 0 },
  Whoisguard: 
   { Enabled: 'True',
     ID: 268909,
     ExpiredDate: '10/03/2019',
     EmailDetails: 
      { WhoisGuardEmail: '21fcbbecc15d4923bb3918216d4acdc3.protect@whoisguard.com',
        ForwardedTo: 'artdeco@adc.sh',
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
   [ { ID: 330335,
       Name: 'rqt-example-2018-10-3-22-53-24.com',
       User: 'zavr',
       Created: '10/03/2018',
       Expires: '10/03/2019',
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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## `domains`

Methods to register and retrieve domains' info.

### `async create(`<br/>&nbsp;&nbsp;`options: Create,`<br/>`): RegistrationResult`

Register a domain.

```js
// Find the default account address.
const ad = await nc.users.address.getList()
const { AddressId } = ad.find(({ IsDefault }) => IsDefault)
const address = await nc.users.address.getInfo(AddressId)

// Register a domain.
await nc.domains.create({
  domain: 'example-test-100.com',
  address,
})
// Result:
{ Domain: 'example-test-100.com',
  Registered: true,
  ChargedAmount: '9.0600',
  DomainID: 330037,
  OrderID: 1291740,
  TransactionID: 1828960,
  WhoisguardEnable: true,
  FreePositiveSSL: false,
  NonRealTimeDomain: false }
```

__<a name="type-create">`Create`</a>__: Options to register a domain.

|       Name        |      Type       |                                                                                         Description                                                                                         | Default |
| ----------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| __domain*__       | _string_        | The domain name to register.                                                                                                                                                                | -       |
| years             | _number_        | The number of years to register.                                                                                                                                                            | `1`     |
| promo             | _string_        | Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.                                                                          | -       |
| nameservers       | _string[]_      | The comma-separated list of custom nameservers to be associated with the domain name.                                                                                                       | -       |
| whois             | _boolean_       | Adds free WhoisGuard for the domain.                                                                                                                                                        | `true`  |
| __address*__      | _AddressDetail_ | A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.users.address.getList` and `namecheap.users.address.getInfo`. | -       |
| billingAddress    | _AddressDetail_ | An address to use for `AuxBilling` address details.                                                                                                                                         | -       |
| registrantAddress | _AddressDetail_ | An address to use for `Registrant` address details.                                                                                                                                         | -       |
| techAddress       | _AddressDetail_ | An address to use for `Tech` address details.                                                                                                                                               | -       |
| adminAddress      | _Admin_         | An address to use for `Admin` address details.                                                                                                                                              | -       |

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

### `async check(`<br/>&nbsp;&nbsp;`options: string|Check,`<br/>`): DomainCheck[]`

Check a domain or domains for availability.

```js
await nc.domains.check('test.co')

// Result:
[ { Domain: 'test.co',
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

__<a name="type-check">`Check`</a>__: Options to check a domain or domains.

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
// Obtain information for the testt.cc domain:
await nc.domains.getInfo({ domain: 'testt.cc' })
await nc.domains.getInfo('testt.cc')

// Result:
{ Status: 'Ok',
  ID: 30072635,
  DomainName: 'testt.cc',
  OwnerName: 'artdeco',
  IsOwner: true,
  IsPremium: false,
  DomainDetails:
  { CreatedDate: '06/06/2018',
    ExpiredDate: '06/06/2019',
    NumYears: 0 },
  Whoisguard:
  { Enabled: 'True',
    ID: 23996873,
    ExpiredDate: '06/05/2019',
    EmailDetails:
      { WhoisGuardEmail: 'ff474db8ad3b4c3b95a2b0f3b3a73acc.protect[at]whoisguard.com',
        ForwardedTo: 'example[at]adc.sh',
        LastAutoEmailChangeDate: '',
        AutoEmailChangeFrequencyDays: 0 } },
  PremiumDnsSubscription:
  { UseAutoRenew: false,
    SubscriptionId: -1,
    CreatedDate: 0001-01-01T00:00:00.000Z,
    ExpirationDate: 0001-01-01T00:00:00.000Z,
    IsActive: false },
  DnsDetails:
  { ProviderType: 'CUSTOM',
    IsUsingOurDNS: false,
    HostCount: 2,
    EmailType: 'FWD',
    DynamicDNSStatus: false,
    IsFailover: false,
    Nameserver:
      [ 'ns-1013.awsdns-62.net',
        'ns-1311.awsdns-35.org',
        'ns-1616.awsdns-10.co.uk',
        'ns-355.awsdns-44.com' ] },
  Modificationrights: { All: true } }
```

### `async getList(`<br/>&nbsp;&nbsp;`options?: GetList,`<br/>`): { domains, TotalItems, CurrentPage, PageSize }`

Returns a list of domains for the particular user.

```js
// Get information about domains in the `.app` zone
// sorted by descending  create date (oldest first)
await nc.domains.getList({
  sort: 'create',
  desc: true,
  filter: '.app',
})

// Result:
{
  domains: [
    {
      ID: 30071047,
      Name: 'example.app',
      User: 'artdeco',
      Created: '06/05/2018',
      Expires: '06/05/2019',
      IsExpired: false,
      IsLocked: false,
      AutoRenew: true,
      WhoisGuard: 'ENABLED',
      IsPremium: false,
      IsOurDNS: false
    },
    {
      ID: 30072635,
      Name: 'test.app',
      User: 'artdeco',
      Created: '06/06/2018',
      Expires: '06/06/2019',
      IsExpired: false,
      IsLocked: false,
      AutoRenew: true,
      WhoisGuard: 'ENABLED',
      IsPremium: false,
      IsOurDNS: false
    },
  ],
  TotalItems: 2,
  CurrentPage: 1,
  PageSize: 20,
}
```

__<a name="type-getlist">`GetList`</a>__: Options to get a list of domains.

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

(c) [Rqt][1] 2018

[1]: https://rqt.biz

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>