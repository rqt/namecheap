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
       * @fnType {_namecheap.UsersAPI.getPricing}
       */
      getPricing: (options) => {
        return users.getPricing(options)
      },
    }
    this.address = {
      /**
       * @fnType {_namecheap.AddressAPI.getList}
       */
      getList: () => {
        return address.getList()
      },
      /**
       * @fnType {_namecheap.AddressAPI.getInfo}
       */
      getInfo: (id) => {
        return address.getInfo(id)
      },
    }
    this.domains = {
      /**
       * @fnType {_namecheap.DomainsAPI.getList}
       */
      getList: (options) => {
        return domains.getList(options)
      },
      /**
       * @fnType {_namecheap.DomainsAPI.getInfo}
       */
      getInfo: (options) => {
        return domains.getInfo(options)
      },
      /**
       * @fnType {_namecheap.DomainsAPI.check}
       */
      check: (options) => {
        return domains.check(options)
      },
      /**
       * @fnType {_namecheap.DomainsAPI.create}
       */
      create: (options) => {
        return domains.create(options)
      },
    }
    this.dns = {
      /**
       * @fnType {_namecheap.DnsAPI.getHosts}
       */
      getHosts: (domain) => {
        return dns.getHosts(domain)
      },
      /**
       * @fnType {_namecheap.DnsAPI.setHosts}
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

console.log('testing compile')