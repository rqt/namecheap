/**
 * @typedef {import('../../../../src').default} NameCheap
 */
/* start example */
/**
 * @param {NameCheap} client
 */
const GetList = async (client) => {
  const res = await client.users.address.getList()
  return res
}
/* end example */

export default GetList