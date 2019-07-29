import getHosts from './domains/dns/get-hosts'
import setHosts from './domains/dns/set-hosts'

import getAddressList from './address/get-list'
import getAddressInfo from './address/get-info'

const address = {
  /**
   * Gets a list of address IDs and address names associated with the user account.
   */
  async getList() {
    const res = await getAddressList(this._query.bind(this))
    return res
  },
  /**
   * Gets information for the requested address ID.
   * @param {string|number} id The address id to get info about.
   */
  async getInfo(id) {
    const res = await getAddressInfo(this._query.bind(this), id)
    return res
  },
}

const dns = {
  /**
   * Retrieves DNS host record settings for the requested domain.
   * @param {string} domain
   */
  async getHosts(domain) {
    const [sld, ...rest] = domain.split('.')
    const tld = rest.join('.')
    const res = await getHosts(this._query.bind(this), { sld, tld })
    return res
  },
  /**
   * Sets the host records.
   * @param {string} domain The domain name for which to set records.
   * @param {!Array<_namecheap.HostParams>} hosts An array with hosts to set.
   * @param {_namecheap.DNSSetOptions} [params] Optional parameters.
   */
  async setHosts(domain, hosts, params = {}) {
    const [sld, ...rest] = domain.split('.')
    const tld = rest.join('.')
    const res = await setHosts(this._query.bind(this), { 'SLD': sld, 'TLD': tld, ...params }, hosts)
    return res
  },
}

const api = {
  domains,
  address,
  dns,
}

export default api