/**
 * @fileoverview
 * @externs
 */

/* typal types/api/domains/check.xml externs */
/** @const */
var _namecheap = {}
/**
 * Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx
 * @typedef {{ domain: (string|undefined), domains: ((!Array<string>)|undefined) }}
 */
_namecheap.Check
/**
 * The result of the check.
 * @typedef {{ Domain: string, Available: boolean, IsPremiumName: boolean, PremiumRegistrationPrice: boolean, PremiumRenewalPrice: boolean, PremiumRestorePrice: boolean, PremiumTransferPrice: boolean, EapFee: number, IcannFee: number }}
 */
_namecheap.DomainCheck

/* typal types/api/domains/get-info.xml externs */
/**
 * Options to get info about a domain. https://www.namecheap.com/support/api/methods/domains/get-info.aspx
 * @typedef {{ domain: string, host: (string|undefined) }}
 */
_namecheap.GetInfo
/**
 * The information about the domain returned by the `domains.getinfo` method.
 * @typedef {{ DomainName: string, OwnerName: string, ID: number, IsOwner: boolean, IsPremium: boolean, Status: string, DomainDetails: _namecheap.DomainDetails, LockDetails: _namecheap.LockDetails, Whoisguard: _namecheap.Whoisguard, PremiumDnsSubscription: _namecheap.PremiumDnsSubscription, DnsDetails: _namecheap.DnsDetails, Modificationrights: _namecheap.ModificationRights }}
 */
_namecheap.DomainInfo
/**
 * Primary information about the domain.
 * @typedef {{ CreatedDate: string, ExpiredDate: string, NumYears: number }}
 */
_namecheap.DomainDetails
/**
 * @typedef {Object}
 */
_namecheap.LockDetails
/**
 * Whois information.
 * @typedef {{ Enabled: boolean, ID: string, ExpiredDate: string, EmailDetails: _namecheap.EmailDetails }}
 */
_namecheap.Whoisguard
/**
 * @typedef {{ AutoEmailChangeFrequencyDays: number, ForwardedTo: string, LastAutoEmailChangeDate: string, WhoisGuardEmail: string }}
 */
_namecheap.EmailDetails
/**
 * Information about the Premium DNS value-added service.
 * @typedef {{ CreatedDate: Date, ExpirationDate: Date, IsActive: boolean, SubscriptionId: number, UseAutoRenew: boolean }}
 */
_namecheap.PremiumDnsSubscription
/**
 * DNS information, such as nameservers, _etc_.
 * @typedef {{ DynamicDNSStatus: boolean, EmailType: string, HostCount: number, IsFailover: boolean, IsUsingOurDNS: boolean, Nameserver: !Array<string>, ProviderType: string }}
 */
_namecheap.DnsDetails
/**
 * @typedef {{ All: boolean, hosts: (boolean|undefined) }}
 */
_namecheap.ModificationRights

/* typal types/api/domains/get-list.xml externs */
/**
 * Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx
 * @typedef {{ type: (string|undefined), filter: (string|undefined), page: (number|undefined), pageSize: (number|undefined), sort: (string|undefined), desc: (boolean|undefined) }}
 */
_namecheap.GetList
/**
 * @typedef {{ AutoRenew: boolean, Created: string, Expires: string, ID: number, IsExpired: boolean, IsLocked: boolean, IsOurDNS: boolean, IsPremium: boolean, Name: string, User: string, WhoisGuard: string }}
 */
_namecheap.Domain

/* typal types/api/domains/create.xml externs */
/**
 * Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx
 * @record
 */
_namecheap.Create
/**
 * The domain name to register.
 * @type {string}
 */
_namecheap.Create.prototype.domain
/**
 * The number of years to register. Default `1`.
 * @type {number|undefined}
 */
_namecheap.Create.prototype.years
/**
 * Promotional (coupon) code for the domain. Check https://www.namecheap.com/promos/coupons/ for this month's offers.
 * @type {string|undefined}
 */
_namecheap.Create.prototype.promo
/**
 * The comma-separated list of custom nameservers to be associated with the domain name.
 * @type {(!Array<string>)|undefined}
 */
_namecheap.Create.prototype.nameservers
/**
 * Adds free WhoisGuard for the domain. Default `true`.
 * @type {boolean|undefined}
 */
_namecheap.Create.prototype.whois
/**
 * A single address to use for `Registrant`, `Tech`, `Admin`, and `AuxBilling`. Saved addresses can be found out with `namecheap.address.getList` and `namecheap.address.getInfo`.
 * @type {!_namecheap.AddressDetail}
 */
_namecheap.Create.prototype.address
/**
 * An address to use for `AuxBilling` address details.
 * @type {(!_namecheap.AddressDetail)|undefined}
 */
_namecheap.Create.prototype.billingAddress
/**
 * An address to use for `Registrant` address details.
 * @type {(!_namecheap.AddressDetail)|undefined}
 */
_namecheap.Create.prototype.registrantAddress
/**
 * An address to use for `Tech` address details.
 * @type {(!_namecheap.AddressDetail)|undefined}
 */
_namecheap.Create.prototype.techAddress
/**
 * An address to use for `Admin` address details.
 * @type {(!_namecheap.AddressDetail)|undefined}
 */
_namecheap.Create.prototype.adminAddress
/**
 * Information about a premium domain.
 * @type {(!_namecheap.PremiumInfo)|undefined}
 */
_namecheap.Create.prototype.premium
/**
 * Information about a premium domain.
 * @typedef {{ IsPremiumName: boolean, PremiumRegistrationPrice: boolean, EapFee: (number|undefined) }}
 */
_namecheap.PremiumInfo
/**
 * Registered domain information.
 * @record
 */
_namecheap.RegistrationResult
/**
 * Total amount charged for registration.
 * @type {string}
 */
_namecheap.RegistrationResult.prototype.ChargedAmount
/**
 * Domain name that you are trying to register.
 * @type {string}
 */
_namecheap.RegistrationResult.prototype.Domain
/**
 * Unique integer value that represents the domain.
 * @type {number}
 */
_namecheap.RegistrationResult.prototype.DomainID
/**
 * Indicates whether the domain registration is instant (real-time) or not.
 * @type {boolean}
 */
_namecheap.RegistrationResult.prototype.NonRealTimeDomain
/**
 * Unique integer value that represents the order.
 * @type {number}
 */
_namecheap.RegistrationResult.prototype.OrderID
/**
 * Indicates whether the domain was registered.
 * @type {boolean}
 */
_namecheap.RegistrationResult.prototype.Registered
/**
 * Unique integer value that represents the transaction.
 * @type {number}
 */
_namecheap.RegistrationResult.prototype.TransactionID
/**
 * Indicates whether WhoisGuard protection is enabled for the domain.
 * @type {boolean}
 */
_namecheap.RegistrationResult.prototype.WhoisguardEnable
