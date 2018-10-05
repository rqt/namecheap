/**
 * @typedef {import('../../../../src').default} NameCheap
 */
/* start example */
/**
 * @param {string|number} id The address to get info about.
 * @param {NameCheap} client
 */
const GetInfo = async (id, client) => {
  const res = await client.users.address.getInfo(id)
  return res
}
/* end example */

export default GetInfo