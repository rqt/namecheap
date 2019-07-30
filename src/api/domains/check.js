import { validateDomains } from '../../lib'
import extractTags from 'rexml'

const COMMAND = 'namecheap.domains.check'

/**
 * Check if the domain name is taken.
 * @param {!Function} query
 * @param {string|_namecheap.Check} options
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
async function check(query, options) {
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

  const res = await query(COMMAND, { 'DomainList': d.join(',') })
  const DomainCheckResult = extractTags('DomainCheckResult', res)

  /** @type {!Array<!_namecheap.DomainCheck>} */
  const results = DomainCheckResult.map(({ props }) => props)
  return results
}

export default check

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/typedefs/domains').DomainCheck} _namecheap.DomainCheck
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/typedefs/domains').Check} _namecheap.Check
 */