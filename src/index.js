import query from './lib/query'

import getList from './api/domains/get-list'
import getInfo from './api/domains/get-info'
import check from './api/domains/check'
import create from './api/domains/create'

import getHosts from './api/domains/dns/get-hosts'
import setHosts from './api/domains/dns/set-hosts'

import getAddressList from './api/address/get-list'
import getAddressInfo from './api/address/get-info'

import getPricing from './api/users/get-pricing'

/**
 * @implements {_namecheap.NameCheap}
 */
export default class NameCheap {
  /**
   * Create a new instance of the client.
   * @param {!_namecheap.Options} options Options for the NameCheap client.
   * @param {string} options.user The username required to access the API.
   * @param {string} options.key The password required used to access the API.
   * @param {string} options.ip The IP address of the client accessing the application (End-user IP address).
   * @param {boolean} [options.sandbox=false] Whether to use the sandbox version of the API. Default `false`.
   */
  constructor(options) {
    const {
      user,
      key,
      sandbox = false,
      ip,
    } = options
    this._user = user
    this._key = key
    this._host = `https://api.${sandbox ? 'sandbox.' : ''}namecheap.com`
    this._ip = ip
    const q = this._query.bind(this)

    this.users = {
      /**
       * Returns pricing information for a requested product type.
       * @param {!_namecheap.GetPricing} opts
       */
      async getPricing(opts) {
        const res = await getPricing(q, opts)
        return res
      },
    }

    this.domains = {
      /**
       * Returns a list of domains for the particular user.
       * @param {!_namecheap.GetList} opts Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx
       */
      async getList(opts = {}) {
        const res = await getList(q, opts)
        return res
      },
      /**
       * Returns information about the requested domain.
       * @param {string|!_namecheap.GetInfo} opts Options to get info about a domain. https://www.namecheap.com/support/api/methods/domains/get-info.aspx
       */
      async getInfo(opts) {
        const res = await getInfo(q, opts)
        return res
      },
      /**
       * Check if the domain name is taken.
       * @param {string|!_namecheap.Check} opts Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx
       */
      async check(opts) {
        const res = await check(q, opts)
        return res
      },
      /**
       * Register a domain.
       * @param {!_namecheap.Create} opts Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx
       */
      async create(opts) {
        const res = await create(q, opts)
        return res
      },
    }

    this.address = {
      /**
       * Gets a list of address IDs and address names associated with the user account.
       */
      async getList() {
        const res = await getAddressList(q)
        return res
      },
      /**
       * Gets information for the requested address ID.
       * @param {string|number} id The address id to get info about.
       */
      async getInfo(id) {
        const res = await getAddressInfo(q, id)
        return res
      },
    }

    this.dns = {
      /**
       * Retrieves DNS host record settings for the requested domain.
       * @param {string} domain
       */
      async getHosts(domain) {
        const [sld, ...rest] = domain.split('.')
        const tld = rest.join('.')
        const res = await getHosts(q, { sld, tld })
        return res
      },
      /**
       * Sets the host records.
       * @param {string} domain The domain name for which to set records.
       * @param {!Array<!_namecheap.HostParams>} hosts An array with hosts to set.
       * @param {!_namecheap.DNSSetOptions} [params] Optional parameters.
       */
      async setHosts(domain, hosts, params = {}) {
        const [sld, ...rest] = domain.split('.')
        const tld = rest.join('.')
        const res = await setHosts(q, { 'SLD': sld, 'TLD': tld, ...params }, hosts)
        return res
      },
    }
  }
  /**
   * @param {string} endpoint Which method should be queried, e.g., `namecheap.domains.getList`.
   * @param {!Object<string, string>} [params] The map of parameters.
   * @param {string} [method] Such as POST or GET.
   */
  async _query(endpoint, params, method) {
    // const cb = erotic(true)
    try {
      const res = await query({
        ApiKey: this._key,
        ApiUser: this._user,
        host: this._host,
        ClientIp: this._ip,
      }, endpoint, params, method)
      return res
    } catch (err) {
      // const e = cb(err)
      throw err
    }
  }
}

/* documentary types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_namecheap.Options} Options Options for the NameCheap client.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _namecheap.Options Options for the NameCheap client.
 * @prop {string} user The username required to access the API.
 * @prop {string} key The password required used to access the API.
 * @prop {string} ip The IP address of the client accessing the application (End-user IP address).
 * @prop {boolean} [sandbox=false] Whether to use the sandbox version of the API. Default `false`.
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/users').GetPricing} _namecheap.GetPricing
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/domains').GetList} _namecheap.GetList
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/domains').GetInfo} _namecheap.GetInfo
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/domains').Domain} _namecheap.Domain
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/domains').DomainInfo} _namecheap.DomainInfo
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_namecheap.DomainCheck} DomainCheck
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/domains').DomainCheck} _namecheap.DomainCheck
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_namecheap.Check} Check
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/domains').Check} _namecheap.Check
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/domains').Create} _namecheap.Create
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/domains').RegistrationResult} _namecheap.RegistrationResult
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/dns').HostParams} _namecheap.HostParams
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/typedefs/dns').DNSSetOptions} _namecheap.DNSSetOptions
 */