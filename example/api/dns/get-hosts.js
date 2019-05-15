/**
 * @typedef {import('../../../src').default} NameCheap
 */
/* start example */
/**
 * @param {string} domain The domain to get hosts for.
 * @param {NameCheap} client
 */
const GetHosts = async (domain, client) => {
  const res = await client.dns.getHosts(domain)
  return res
}
/* end example */

export default GetHosts