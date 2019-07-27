/**
 * @typedef {import('../../../src').default} NameCheap
 */
/**
 * @typedef {import('../../../src/api').HostParams} HostParams
 */
/* start example */
/**
 * @param {string} domain The domain to get hosts for.
 * @param {Array<HostParams>} hosts The hosts to set.
 * @param {NameCheap} client
 */
const SetHosts = async (domain, hosts, client) => {
  const res = await client.dns.setHosts(domain, hosts)
  return res
}
/* end example */

export default SetHosts