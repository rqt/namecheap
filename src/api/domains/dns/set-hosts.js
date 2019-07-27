import extractTag from 'rexml'

const COMMAND = 'namecheap.domains.dns.setHosts'

/**
 * @param {?} query
 * @param {Object} params
 * @param {Array<HostParams>} hosts
 */
export default async function setHosts(query, params, hosts) {
  const reqOpts = hosts.reduce((acc, host, i) => {
    Object.entries(host).forEach(([key, value]) => {
      if (!['HostName', 'RecordType', 'Address', 'MXPref', 'TTL'].includes(key)) return
      const k = `${key}${i+1}`
      acc[k] = value
    })
    return acc
  }, params)
  const res = await query(COMMAND, reqOpts, 'POST')
  const [{ props }] = extractTag('DomainDNSSetHostsResult', res)
  const p = /** @type {{ Domain: string, IsSuccess: boolean }} */ (props)
  return p
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../').Host} _namecheap.Host
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').HostParams} HostParams
 */