const _Namecheap = require('./namecheap')

class Namecheap extends _Namecheap {
  /**
   * @param {_namecheap.Options} opts Options for the NameCheap client.
   * @param {string} opts.user The username required to access the API.
   * @param {string} opts.key The password required used to access the API.
   * @param {string} opts.ip The IP address of the client accessing the application (End-user IP address).
   * @param {boolean} [opts.sandbox=false] Whether to use the sandbox version of the API. Default `false`.
   */
  constructor(opts) {
    super(opts)
    const { address, domains, dns, users } = this
    this.users = {
      /**
       * Returns pricing information for a requested product type.
       * @param {!_namecheap.GetPricing} options Options
       * @return {!Promise<!_namecheap.Pricing>}
       */
      getPricing: (options) => {
        return users.getPricing(options)
      },
    }
    this.address = {
      /**
       * Gets a list of address IDs and address names associated with the user account.
       * @return {!Promise<!Array<!_namecheap.Address>>}
       */
      getList: () => {
        return address.getList()
      },
      /**
       * Gets information for the requested address ID.
       * @param {(string|number)} id The address id.
       * @return {!Promise<!_namecheap.AddressDetail>}
       */
      getInfo: (id) => {
        return address.getInfo(id)
      },
    }
    this.domains = {
      /**
       * Returns a list of domains for the particular user.
       * @param {!_namecheap.GetList} options The options to get the list of domains.
       * @return {!Promise<{ domains: !Array<!_namecheap.Domain>, TotalItems: number, CurrentPage: number, PageSize: number }>}
       */
      getList: (options) => {
        return domains.getList(options)
      },
      /**
       * Returns information about the requested domain.
       * @param {(string|!_namecheap.GetInfo)} options The domain, or all get-info options.
       * @return {!Promise<!_namecheap.DomainInfo>}
       */
      getInfo: (options) => {
        return domains.getInfo(options)
      },
      /**
       * Check if the domain name is taken.
       * @param {(string|!_namecheap.Check)} options The domain, or all check options.
       * @return {!Promise<!Array<!_namecheap.DomainCheck>>}
       */
      check: (options) => {
        return domains.check(options)
      },
      /**
       * Register a domain.
       * @param {!_namecheap.Create} options How to create a domain.
       * @return {!Promise<!_namecheap.RegistrationResult>}
       */
      create: (options) => {
        return domains.create(options)
      },
    }
    this.dns = {
      /**
       * Retrieves DNS host record settings for the requested domain.
       * @param {string} domain The domain name.
       * @return {!Promise<{ hosts: !Array<!_namecheap.Host>, IsUsingOurDNS: boolean, Domain: string, EmailType: string }>}
       */
      getHosts: (domain) => {
        return dns.getHosts(domain)
      },
      /**
       * Sets the host records.
       * @param {string} domain The domain name for which to set records.
       * @param {!Array<!_namecheap.HostParams>} hosts The array of all hosts to set.
       * @param {!_namecheap.DNSSetOptions=} [options] Optional parameters.
       * @return {!Promise<{ Domain: string, IsSuccess: boolean }>}
       */
      setHosts: (domain, hosts, options) => {
        return dns.setHosts(domain, hosts, options)
      },
    }
  }
}

/* typal types/index.xml closure noSuppress */
/**
 * @typedef {_namecheap.Options} Options Options for the NameCheap client.
 */
/**
 * @typedef {Object} _namecheap.Options Options for the NameCheap client.
 * @prop {string} user The username required to access the API.
 * @prop {string} key The password required used to access the API.
 * @prop {string} ip The IP address of the client accessing the application (End-user IP address).
 * @prop {boolean} [sandbox=false] Whether to use the sandbox version of the API. Default `false`.
 */

/**
 * @typedef {import('../types/typedefs/users').GetPricing} _namecheap.GetPricing
 * @typedef {import('../types/typedefs/users').Pricing} _namecheap.Pricing
 * @typedef {import('../types/typedefs/dns').Host} _namecheap.Host
 * @typedef {import('../types/typedefs/dns').HostParams} _namecheap.HostParams
 * @typedef {import('../types/typedefs/dns').DNSSetOptions} _namecheap.DNSSetOptions
 * @typedef {import('../types/typedefs/domains').GetList} _namecheap.GetList
 * @typedef {import('../types/typedefs/domains').GetInfo} _namecheap.GetInfo
 * @typedef {import('../types/typedefs/domains').DomainInfo} _namecheap.DomainInfo
 * @typedef {import('../types/typedefs/domains').Domain} _namecheap.Domain
 * @typedef {import('../types/typedefs/domains').Check} _namecheap.Check
 * @typedef {import('../types/typedefs/domains').DomainCheck} _namecheap.DomainCheck
 * @typedef {import('../types/typedefs/domains').Create} _namecheap.Create
 * @typedef {import('../types/typedefs/domains').RegistrationResult} _namecheap.RegistrationResult
 * @typedef {import('../types/typedefs/address').Address} _namecheap.Address
 * @typedef {import('../types/typedefs/address').AddressDetail} _namecheap.AddressDetail
 */

module.exports = Namecheap

// console.log('testing compile')