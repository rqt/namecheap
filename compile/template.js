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
    this.users = {
      /**
       * @type {_namecheap.UsersAPI.getPricing}
       */
      getPricing: (options) => {
        return super.users.getPricing(options)
      },
    }
    this.dns = {
      /**
       * @type {_namecheap.DnsAPI.getHosts}
       */
      getHosts: (domain) => {
        return super.dns.getHosts(domain)
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
 */

module.exports = Namecheap

console.log('testing compile')