import erotic from 'erotic'
import api from './api'
import query from './lib/query'

export default class NameCheap {
  /**
   * Create a new instance of the client.
   * @constructor
   * @param {Options} options Options for the NameCheap client.
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
    this.domains = new Proxy(api.domains, {
      get: (target, k) => {
        const v = target[k]
        if (typeof v == 'function') {
          return v.bind(this)
        }
        return v
      },
    })
    this.address = new Proxy(api.address, {
      get: (target, k) => {
        const v = target[k]
        if (typeof v == 'function') {
          return v.bind(this)
        }
        return v
      },
    })
    this.users = new Proxy(api.users, {
      get: (target, k) => {
        const v = target[k]
        if (typeof v == 'function') {
          return v.bind(this)
        }
        return v
      },
    })
    // this.users = new Proxy(api.users, {
    //   get: (target, k) => {
    //     if (k == 'address') return address
    //     const v = target[k]
    //     if (typeof v == 'function') {
    //       return v.bind(this)
    //     }
    //     return v
    //   },
    // })
    // this.users.address = address
  }
  /**
   * @param {string} endpoint Which method should be queried, e.g., `namecheap.domains.getList`.
   * @param {Object.<string, string>} [params] The map of parameters.
   * @param {'POST'|'GET'} method
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
 * @typedef {Object} Options Options for the NameCheap client.
 * @prop {string} user The username required to access the API.
 * @prop {string} key The password required used to access the API.
 * @prop {string} ip The IP address of the client accessing the application (End-user IP address).
 * @prop {boolean} [sandbox=false] Whether to use the sandbox version of the API. Default `false`.
 */
