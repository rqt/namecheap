import erotic from 'erotic'
import api from './api'
import query from './lib/query'

export default class NameCheap {
  constructor({
    user,
    key,
    sandbox = false,
    ip,
  }) {
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
  }
  /**
   * @param {string} endpoint Which method should be queried, e.g., `namecheap.domains.getList`.
   * @param {Object.<string, string>} [params] The map of parameters.
   */
  async _query(endpoint, params) {
    const cb = erotic(true)
    try {
      const res = await query({
        ApiKey: this._key,
        ApiUser: this._user,
        host: this._host,
        ClientIp: this._ip,
      }, endpoint, params)
      return res
    } catch (err) {
      const e = cb(err)
      throw e
    }
  }
}