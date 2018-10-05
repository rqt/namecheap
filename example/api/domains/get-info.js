/**
 * @typedef {import('../../../src').default} NameCheap
 */
/* start example */
/**
 * @param {string} domain The domain to get info about.
 * @param {NameCheap} client
 */
const GetInfo = async (domain, client) => {
  // Info with options.
  await client.domains.getInfo({ domain })

  // Simplified info with a string.
  const res = await client.domains.getInfo(domain)
  return res
}
/* end example */

export default GetInfo