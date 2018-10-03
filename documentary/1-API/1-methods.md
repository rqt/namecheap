## `domains`

Methods to register and retrieve domains' info.

```### async create => RegistrationResult
[
  ["options", "Create"]
]
```

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

%TYPEDEF types/api/domains/create.xml%

```### async check => DomainCheck[]
[
  ["options", "string|Check"]
]
```

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

%TYPEDEF types/api/domains/check.xml%

```### async getInfo => DomainInfo
[
  ["options", "string|GetInfo"]
]
```

Returns information about the requested domain.

%TYPEDEF types/api/domains/get-info.xml%

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

```### async getList => { domains, TotalItems, CurrentPage, PageSize }
[
  ["options?", "GetList"]
]
```

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

%TYPEDEF types/api/domains/get-list.xml%

%~%