export {}
/* typal types/api/domains/check.xml noSuppress */
/**
 * @typedef {_namecheap.Check} Check Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx
 */
/**
 * @typedef {Object} _namecheap.Check Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx
 * @prop {string} [domain] The domain check.
 * @prop {!Array<string>} [domains] The domains to check.
 */
/**
 * @typedef {_namecheap.DomainCheck} DomainCheck The result of the check.
 */
/**
 * @typedef {Object} _namecheap.DomainCheck The result of the check.
 * @prop {string} Domain The domain name for which you wish to check availability.
 * @prop {boolean} Available Indicates whether the domain name is available for registration.
 * @prop {boolean} IsPremiumName Indicates whether the domain name is premium.
 * @prop {string} PremiumRegistrationPrice The registration price for the premium domain as returned by the API, e.g., `76.7000`.
 * @prop {string} PremiumRenewalPrice The renewal price for the premium domain.
 * @prop {string} PremiumRestorePrice The restore price for the premium domain as returned by the API, e.g., `206.7000`.
 * @prop {string} PremiumTransferPrice The transfer price for the premium domain.
 * @prop {number} EapFee Purchase fee for the premium domain during Early Access Program (EAP)*.
 * @prop {number} IcannFee Fee charged by ICANN.
 */

/* typal types/api/domains/get-info.xml noSuppress */
/**
 * @typedef {_namecheap.GetInfo} GetInfo Options to get info about a domain. https://www.namecheap.com/support/api/methods/domains/get-info.aspx
 */
/**
 * @typedef {Object} _namecheap.GetInfo Options to get info about a domain. https://www.namecheap.com/support/api/methods/domains/get-info.aspx
 * @prop {string} domain The domain to get info about.
 * @prop {string} [host] The hosted domain name for which domain information needs to be requested.
 */
/**
 * @typedef {_namecheap.DomainInfo} DomainInfo The information about the domain returned by the `domains.getinfo` method.
 */
/**
 * @typedef {Object} _namecheap.DomainInfo The information about the domain returned by the `domains.getinfo` method.
 * @prop {string} DomainName Domain name for which the information was requested, e.g., `example.com`.
 * @prop {string} OwnerName User account under which the domain is registered, e.g., `rqt`.
 * @prop {number} ID Unique integer value that represents the domain,e.g., `314928`.
 * @prop {boolean} IsOwner Indicates whether the API user is the owner of the domain, e.g., `true`.
 * @prop {boolean} IsPremium Indicates whether the domain name is premium, e.g., `false`.
 * @prop {string} Status Indicates the status of the domain, e.g., `Ok`.
 * Possible values: `Ok`, `Locked`, `Expired`.
 * @prop {_namecheap.DomainDetails} DomainDetails
 * @prop {_namecheap.LockDetails} LockDetails
 * @prop {_namecheap.Whoisguard} Whoisguard
 * @prop {_namecheap.PremiumDnsSubscription} PremiumDnsSubscription
 * @prop {_namecheap.DnsDetails} DnsDetails
 * @prop {_namecheap.ModificationRights} Modificationrights
 */
/**
 * @typedef {_namecheap.DomainDetails} DomainDetails Primary information about the domain.
 */
/**
 * @typedef {Object} _namecheap.DomainDetails Primary information about the domain.
 * @prop {string} CreatedDate `06/06/2018`
 * @prop {string} ExpiredDate `06/06/2019`
 * @prop {number} NumYears 1
 */
/**
 * @typedef {_namecheap.LockDetails} LockDetails
 */
/**
 * @typedef {Object} _namecheap.LockDetails
 */
/**
 * @typedef {_namecheap.Whoisguard} Whoisguard Whois information.
 */
/**
 * @typedef {Object} _namecheap.Whoisguard Whois information.
 * @prop {boolean} Enabled `true`
 * @prop {string} ID `264991`
 * @prop {string} ExpiredDate `06/06/2019`
 * @prop {_namecheap.EmailDetails} EmailDetails
 */
/**
 * @typedef {_namecheap.EmailDetails} EmailDetails
 */
/**
 * @typedef {Object} _namecheap.EmailDetails
 * @prop {number} AutoEmailChangeFrequencyDays `0`
 * @prop {string} ForwardedTo `example＠adc.sh`
 * @prop {string} LastAutoEmailChangeDate
 * @prop {string} WhoisGuardEmail `43b596ee817f451f98eab1d848a4051a.protect＠whoisguard.com`
 */
/**
 * @typedef {_namecheap.PremiumDnsSubscription} PremiumDnsSubscription Information about the Premium DNS value-added service.
 */
/**
 * @typedef {Object} _namecheap.PremiumDnsSubscription Information about the Premium DNS value-added service.
 * @prop {Date} CreatedDate
 * @prop {Date} ExpirationDate
 * @prop {boolean} IsActive `false`
 * @prop {number} SubscriptionId -1
 * @prop {boolean} UseAutoRenew `false`
 */
/**
 * @typedef {_namecheap.DnsDetails} DnsDetails DNS information, such as nameservers, _etc_.
 */
/**
 * @typedef {Object} _namecheap.DnsDetails DNS information, such as nameservers, _etc_.
 * @prop {boolean} DynamicDNSStatus `false`
 * @prop {string} EmailType `FWD`
 * @prop {number} HostCount `2`
 * @prop {boolean} IsFailover `false`
 * @prop {boolean} IsUsingOurDNS `true`
 * @prop {!Array<string>} Nameserver `[dns1.registrar-servers.com, dns2.registrar-servers.com]`
 * @prop {string} ProviderType `CUSTOM` or `FREE`.
 */
/**
 * @typedef {_namecheap.ModificationRights} ModificationRights
 */
/**
 * @typedef {Object} _namecheap.ModificationRights
 * @prop {boolean} All `true`
 * @prop {boolean} [hosts]
 */

/* typal types/api/domains/get-list.xml noSuppress */
/**
 * @typedef {_namecheap.GetList} GetList Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx
 */
/**
 * @typedef {Object} _namecheap.GetList Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx
 * @prop {string} [type="ALL"] The type of domains. Accepted values: `ALL`, `EXPIRING`, `EXPIRED`. Default `ALL`.
 * @prop {string} [filter] The keyword to look for in the domain list.
 * @prop {number} [page=1] The page to return. Default `1`.
 * @prop {number} [pageSize=20] The number of domains to be listed on a page. Minimum value is 10, and maximum value is 100. Default `20`.
 * @prop {string} [sort="create"] The field by which to sort domains. If not given, the domains are sorted in descending order by their creation date. One of: `name`, `expire`, create`. Default `create`.
 * @prop {boolean} [desc=false] Whether to sort in descending order. Default `false`.
 */
/**
 * @typedef {_namecheap.Domain} Domain
 */
/**
 * @typedef {Object} _namecheap.Domain
 * @prop {boolean} AutoRenew `false`
 * @prop {string} Created `07/23/2018`
 * @prop {string} Expires `07/23/2019`
 * @prop {number} ID `314928`
 * @prop {boolean} IsExpired `false`
 * @prop {boolean} IsLocked `false`
 * @prop {boolean} IsOurDNS `true`
 * @prop {boolean} IsPremium `false`
 * @prop {string} Name `domain.app`
 * @prop {string} User `user`
 * @prop {string} WhoisGuard `ENABLED`
 */

/* documentary types/api/address/get-info.xml noSuppress */
/**
 * @typedef {_namecheap.AddressDetail} AddressDetail
 */
/**
 * @typedef {Object} _namecheap.AddressDetail
 * @prop {string} EmailAddress Email address of the user.
 * @prop {string} FirstName First name of the user.
 * @prop {string} LastName Last name of the user.
 * @prop {string} [JobTitle] Job designation of the user
 * @prop {string} [Organization] Organization of the user.
 * @prop {string} Address1 StreetAddress1 of the user.
 * @prop {string} [Address2] StreetAddress2 of the user.
 * @prop {string} City City of the user.
 * @prop {string} StateProvince State/Province of the user.
 * @prop {string} StateProvinceChoice State/Province choice of the user. Either `'S'` or `'P'`.
 * @prop {string} Zip Zip/Postal code of the user.
 * @prop {string} Country Two letter country code of the user.
 * @prop {string} Phone Phone number in the format `+NNN.NNNNNNNNNN`.
 * @prop {string} [PhoneExt] PhoneExt of the user.
 * @prop {string} [Fax] Fax number in the format `+NNN.NNNNNNNNNN`.
 */

/* documentary types/api/domains/create.xml noSuppress */
/**
 * @typedef {_namecheap.Create} Create `＠record` Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx
 */
/**
 * @typedef {Object} _namecheap.Create `＠record` Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx
 * @prop {string} domain The domain name to register.
 * @prop {number} [years=1] The number of years to register. Default `1`.
 * @prop {string} [promo] Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.
 * @prop {!Array<string>} [nameservers] The comma-separated list of custom nameservers to be associated with the domain name.
 * @prop {boolean} [whois=true] Adds free WhoisGuard for the domain. Default `true`.
 * @prop {!_namecheap.AddressDetail} address A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.address.getList` and `namecheap.address.getInfo`.
 * @prop {!_namecheap.AddressDetail} [billingAddress] An address to use for `AuxBilling` address details.
 * @prop {!_namecheap.AddressDetail} [registrantAddress] An address to use for `Registrant` address details.
 * @prop {!_namecheap.AddressDetail} [techAddress] An address to use for `Tech` address details.
 * @prop {!_namecheap.AddressDetail} [adminAddress] An address to use for `Admin` address details.
 * @prop {!_namecheap.PremiumInfo} [premium] Information about a premium domain.
 */
/**
 * @typedef {_namecheap.PremiumInfo} PremiumInfo Information about a premium domain.
 */
/**
 * @typedef {Object} _namecheap.PremiumInfo Information about a premium domain.
 * @prop {boolean} IsPremiumName Indicates whether the domain name is premium.
 * @prop {boolean} PremiumRegistrationPrice The registration price for the premium domain.
 * @prop {number} [EapFee] The purchase fee for the premium domain during Early Access Program (EAP).
 */
/**
 * @typedef {_namecheap.RegistrationResult} RegistrationResult `＠record` Registered domain information.
 */
/**
 * @typedef {Object} _namecheap.RegistrationResult `＠record` Registered domain information.
 * @prop {string} ChargedAmount Total amount charged for registration.
 * @prop {string} Domain Domain name that you are trying to register.
 * @prop {number} DomainID Unique integer value that represents the domain.
 * @prop {boolean} NonRealTimeDomain Indicates whether the domain registration is instant (real-time) or not.
 * @prop {number} OrderID Unique integer value that represents the order.
 * @prop {boolean} Registered Indicates whether the domain was registered.
 * @prop {number} TransactionID Unique integer value that represents the transaction.
 * @prop {boolean} WhoisguardEnable Indicates whether WhoisGuard protection is enabled for the domain.
 */
