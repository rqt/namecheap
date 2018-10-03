import { validateDomains } from '../../lib'
import extractTags from 'rexml'

const COMMAND = 'namecheap.domains.check'

/**
 * Check if the domain name is taken.
 * @param {string|Check} options
 * @param {string} [options.domain] The domain check.
 * @param {string[]} [options.domains] The domains to check.
 * @example
 *
 * await nc.domains.check('test.co')
 *
 * [ { Domain: 'test.co',
    Available: false,
    ErrorNo: 0,
    Description: '',
    IsPremiumName: false,
    PremiumRegistrationPrice: 0,
    PremiumRenewalPrice: 0,
    PremiumRestorePrice: 0,
    PremiumTransferPrice: 0,
    IcannFee: 0,
    EapFee: '0.0' } ]
 *
 */
async function check(options) {
  const isSingle = typeof options == 'string'
  const opts = isSingle ? { domain: options } : options
  const {
    domains = [],
    domain,
  } = opts
  if (!Array.isArray(domains)) throw new Error('Domains must be a list.')
  const val = validateDomains(domains)
  if (!val) throw new Error('All domains must be strings.')
  if (domain && typeof domain != 'string')
    throw new Error('Domain must be a string.')
  const d = [...domains, ...(domain ? [domain] : [])]

  const res = await this._query(COMMAND, { DomainList: d.join(',') })
  const DomainCheckResult = extractTags('DomainCheckResult', res)
  /** @type {DomainCheck[]} */
  const results = DomainCheckResult.map(({ props }) => props)
  return results
}

export default check

/* documentary types/api/domains/check.xml */
/**
 * @typedef {Object} Check Options to check a domain or domains. https://www.namecheap.com/support/api/methods/domains/check.aspx
 * @prop {string} [domain] The domain check.
 * @prop {string[]} [domains] The domains to check.
 *
 * @typedef {Object} DomainCheck The result of the check.
 * @prop {string} Domain The domain name for which you wish to check availability.
 * @prop {boolean} Available Indicates whether the domain name is available for registration.
 * @prop {boolean} IsPremiumName Indicates whether the domain name is premium.
 * @prop {boolean} PremiumRegistrationPrice The registration price for the premium domain.
 * @prop {boolean} PremiumRenewalPrice The renewal price for the premium domain.
 * @prop {boolean} PremiumRestorePrice The restore price for the premium domain.
 * @prop {boolean} PremiumTransferPrice The transfer price for the premium domain.
 * @prop {number} EapFee Purchase fee for the premium domain during Early Access Program (EAP)*.
 * @prop {number} IcannFee Fee charged by ICANN.
 */
