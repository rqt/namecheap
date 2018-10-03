/**
 * @typedef {import('../../../src').default} NameCheap
 */
/* start example */
/**
 * @param {string} domain The domain to filter by.
 * @param {NameCheap} client
 */
const GetList = async (domain, client) => {
  const res = await client.domains.getList({
    filter: domain,
  })
  return res
}
/* end example */

export default GetList