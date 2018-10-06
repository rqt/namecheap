const { validateDomains } = require('../../lib');
let extractTags = require('rexml'); if (extractTags && extractTags.__esModule) extractTags = extractTags.default;

const COMMAND = 'namecheap.domains.check'

/**
 * Check if the domain name is taken.
 * @param {Function} query
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

  const res = await query(COMMAND, { DomainList: d.join(',') })
  const DomainCheckResult = extractTags('DomainCheckResult', res)
  /** @type {DomainCheck[]} */
  const results = DomainCheckResult.map(({ props }) => props)
  return results
}

module.exports=check