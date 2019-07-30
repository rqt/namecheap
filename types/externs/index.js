/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _namecheap = {}
/**
 * Options for the NameCheap client.
 * @typedef {{ user: string, key: string, ip: string, sandbox: (boolean|undefined) }}
 */
_namecheap.Options

/* typal types/api/index.xml externs */
/**
 * The client API.
 * @interface
 */
_namecheap.NameCheap
/**
 * Domains operations.
 * @type {_namecheap.DomainsAPI}
 */
_namecheap.NameCheap.prototype.domains
/**
 * Address operations.
 * @type {_namecheap.AddressAPI}
 */
_namecheap.NameCheap.prototype.address
/**
 * User operations.
 * @type {_namecheap.UsersAPI}
 */
_namecheap.NameCheap.prototype.users
/**
 * DNS operations.
 * @type {_namecheap.DnsAPI}
 */
_namecheap.NameCheap.prototype.dns
/**
 * The domains API.
 * @record
 */
_namecheap.DomainsAPI
/**
 * Returns a list of domains for the particular user.
 * @param {!_namecheap.GetList} arg0
 * @return {!Promise<{ domains: !Array<!_namecheap.Domain>, TotalItems: number, CurrentPage: number, PageSize: number }>}
 */
_namecheap.DomainsAPI.prototype.getList = function(arg0) {}
/**
 * Returns information about the requested domain.
 * @param {(string|!_namecheap.GetInfo)} arg0
 * @return {!Promise<!_namecheap.DomainInfo>}
 */
_namecheap.DomainsAPI.prototype.getInfo = function(arg0) {}
/**
 * Check if the domain name is taken.
 * @param {(string|!_namecheap.Check)} arg0
 * @return {!Promise<!Array<!_namecheap.DomainCheck>>}
 */
_namecheap.DomainsAPI.prototype.check = function(arg0) {}
/**
 * Register a domain.
 * @param {!_namecheap.Create} arg0
 * @return {!Promise<!_namecheap.RegistrationResult>}
 */
_namecheap.DomainsAPI.prototype.create = function(arg0) {}
/**
 * The address API.
 * @record
 */
_namecheap.AddressAPI
/**
 * Gets a list of address IDs and address names associated with the user account.
 * @return {!Promise<!Array<!_namecheap.Address>>}
 */
_namecheap.AddressAPI.prototype.getList = function() {}
/**
 * Gets information for the requested address ID.
 * @param {(string|number)} arg0
 * @return {!Promise<!_namecheap.AddressDetail>}
 */
_namecheap.AddressAPI.prototype.getInfo = function(arg0) {}
/**
 * The users API.
 * @record
 */
_namecheap.UsersAPI
/**
 * Returns pricing information for a requested product type.
 * @param {!_namecheap.GetPricing} arg0
 * @return {!Promise<!_namecheap.Pricing>}
 */
_namecheap.UsersAPI.prototype.getPricing = function(arg0) {}
/**
 * The DNS API.
 * @record
 */
_namecheap.DnsAPI
/**
 * Retrieves DNS host record settings for the requested domain.
 * @param {string} arg0
 * @return {!Promise<{ hosts: !Array<!_namecheap.Host>, IsUsingOurDNS: boolean, Domain: string, EmailType: string }>}
 */
_namecheap.DnsAPI.prototype.getHosts = function(arg0) {}
/**
 * Sets the host records.
 * @param {string} arg0
 * @param {!Array<!_namecheap.HostParams>} arg1
 * @param {!_namecheap.DNSSetOptions} [arg2]
 * @return {!Promise<{ Domain: string, IsSuccess: boolean }>}
 */
_namecheap.DnsAPI.prototype.setHosts = function(arg0, arg1, arg2) {}
