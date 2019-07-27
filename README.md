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
- [`address`](#address)
- [`dns`](#dns)
- [Progress](#progress)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import NameCheap from '@rqt/namecheap'
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

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

Registered: { Domain: 'rqt-example-2019-7-27-19-45-12.com',
  Registered: true,
  ChargedAmount: '9.0600',
  DomainID: 428976,
  OrderID: 1546512,
  TransactionID: 2116065,
  WhoisguardEnable: true,
  FreePositiveSSL: false,
  NonRealTimeDomain: false } 

Info: { Status: 'Ok',
  ID: 428976,
  DomainName: 'rqt-example-2019-7-27-19-45-12.com',
  OwnerName: 'zavr',
  IsOwner: true,
  IsPremium: false,
  DomainDetails: 
   { CreatedDate: '07/27/2019',
     ExpiredDate: '07/27/2020',
     NumYears: 0 },
  Whoisguard: 
   { Enabled: 'True',
     ID: 351549,
     ExpiredDate: '07/27/2020',
     EmailDetails: 
      { WhoisGuardEmail: '9f0e5fb0b5494c13bf9b257f08a670a7.protect@whoisguard.com',
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
   [ { ID: 428976,
       Name: 'rqt-example-2019-7-27-19-45-12.com',
       User: 'zavr',
       Created: '07/27/2019',
       Expires: '07/27/2020',
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

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## `domains`

Methods to check availability, register and retrieve account domains' info. <kbd>🎟 <a href="/wiki/Domains">Read Domains Wiki</a></kbd>

## `users`

Methods related to the user. <kbd>👩‍💻 <a href="/wiki/Users">Read Users Wiki</a></kbd>

## `address`

Methods to manipulate addresses. In contrast to the NameCheap API, it does not fall under the group `users`. <kbd>🏡 <a href="/wiki/Address">Read Address Wiki</a></kbd>

## `dns`

Methods to work with DNS records. <kbd>🗺 <a href="/wiki/DNS">Read DNS Wiki</a></kbd>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Progress

* `domains`: 4/11
* `domains.dns`: 1/7
* `domains.ns`: 0/4
* `domains.transfer`: 0/4
* `ssl`: 0/13
* `users`: 1/9
* `users.address`: 2/6
* `whoisguard`: 0/8

---

8/62 = 13%

## Copyright

(c) [Rqt][1] 2019

[1]: https://rqt.biz

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>