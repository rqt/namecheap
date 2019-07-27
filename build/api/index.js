const getList = require('./domains/get-list');
const getInfo = require('./domains/get-info');
const check = require('./domains/check');
const create = require('./domains/create');

const getHosts = require('./domains/dns/get-hosts');
const setHosts = require('./domains/dns/set-hosts');

const getAddressList = require('./address/get-list');
const getAddressInfo = require('./address/get-info');
const getPricing = require('./users/get-pricing');

const domains = {
  /**
   * Returns a list of domains for the particular user.
   * @param {!_namecheap.GetList} options Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx
   */
  async getList(options = {}) {
    /** @type {{domains: !Array<!_namecheap.Domain>, TotalItems: number, CurrentPage: number, PageSize: number}} */
    const res = await getList(this._query.bind(this), options)
    return res
  },
  /**
   * Returns information about the requested domain.
   * @param {string|!_namecheap.GetInfo} options Options to get info about a domain. https://www.namecheap.com/support/api/methods/domains/get-info.aspx
   */
  async getInfo(options) {
    /** @type {!_namecheap.DomainInfo} */
    const res = await getInfo(this._query.bind(this), options)
    return res
  },
  /**
   * Check if the domain name is taken.
   * @param {string|!_namecheap.Check} options Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx
   */
  async check(options) {
    /** @type {!Array<!_namecheap.DomainCheck>} */
    const res = await check(this._query.bind(this), options)
    return res
  },
  /**
   * Register a domain.
   * @param {!_namecheap.Create} options Options to register a domain. https://www.namecheap.com/support/api/methods/domains/create.aspx
   */
  async create(options) {
    /** @type {!_namecheap.RegistrationResult} */
    const res = await create(this._query.bind(this), options)
    return res
  },
}

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

const users = {
  /**
   * Returns pricing information for a requested product type.
   * @param {!_namecheap.GetPricing} options
   */
  async getPricing(options) {
    const res = await getPricing(this._query.bind(this), options)
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
   * @param {DNSSetOptions} [params] Optional parameters.
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
  users,
  dns,
}

module.exports=api

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').GetPricing} _namecheap.GetPricing
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').GetList} _namecheap.GetList
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').GetInfo} _namecheap.GetInfo
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').Domain} _namecheap.Domain
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').DomainInfo} _namecheap.DomainInfo
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').DomainCheck} _namecheap.DomainCheck
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').Check} _namecheap.Check
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').Create} _namecheap.Create
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').RegistrationResult} _namecheap.RegistrationResult
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../').HostParams} _namecheap.HostParams
 * @typedef {_namecheap.HostParams} HostParams
 * @typedef {import('../').DNSSetOptions} _namecheap.DNSSetOptions
 * @typedef {_namecheap.DNSSetOptions} DNSSetOptions
 */