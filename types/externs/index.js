/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/**
 * Options for the NameCheap client.
 * @typedef {{ user: string, key: string, ip: string, sandbox: (boolean|undefined) }}
 */
_namecheap.Options

/* typal types/api/index.xml externs */
/** @const */
var _namecheap = {}
/**
 * The client API.
 * @interface
 */
_namecheap.NameCheap
// /**
//  * Domains operations.
//  * @type {_namecheap.Domains}
//  */
// _namecheap.NameCheap.prototype.domains
// /**
//  * Address operations.
//  * @type {_namecheap.Address}
//  */
// _namecheap.NameCheap.prototype.address
/**
 * User operations.
 * @type {_namecheap.Users}
 */
_namecheap.NameCheap.prototype.users
// /**
//  * DNS operations.
//  * @type {_namecheap.DNS}
//  */
// _namecheap.NameCheap.prototype.dns
// /**
//  * The domains API.
//  * @record
//  */
// _namecheap.Domains
// /**
//  * Returns a list of domains for the particular user.
//  * @type {function(!_namecheap.GetList): !Promise<{ domains: !Array<!_namecheap.Domain>, TotalItems: number, CurrentPage: number, PageSize: number }>}
//  */
// _namecheap.Domains.prototype.getList
// /**
//  * Returns information about the requested domain.
//  * @type {function(string|!_namecheap.GetInfo): !Promise<!_namecheap.DomainInfo>}
//  */
// _namecheap.Domains.prototype.getInfo
// /**
//  * Check if the domain name is taken.
//  * @type {function(string|!_namecheap.Check): !Promise<!Array<!_namecheap.DomainCheck>>}
//  */
// _namecheap.Domains.prototype.check
// /**
//  * Register a domain.
//  * @type {function(!_namecheap.Create): !Promise<!_namecheap.RegistrationResult>}
//  */
// _namecheap.Domains.prototype.create
// /**
//  * The address API.
//  * @typedef {{ getList: function(): !Promise<!Array<!_namecheap.Address>>, getInfo: function(string|number): !Promise<!_namecheap.AddressDetail> }}
//  */
// _namecheap.Address
/**
 * The users API.
 * @typedef {{ getPricing: function(!_namecheap.GetPricing): !Promise<!_namecheap.Pricing> }}
 */
_namecheap.Users
// /**
//  * The DNS API.
//  * @typedef {{ getHosts: function(string): !Promise<{ hosts: !Array<!_namecheap.Host>, IsUsingOurDNS: boolean, Domain: string, EmailType: string }>, setHosts: function(string, !Array<!_namecheap.HostParams>, _namecheap.DNSSetOptions?): !Promise<{ Domain: string, IsSuccess: boolean }> }}
//  */
// _namecheap.DNS
