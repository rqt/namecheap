/**
 * @typedef {import('../../../src').default} NameCheap
 */
/* start example */
/**
 * @param {NameCheap} client
 */
const GetPricing = async (client, options = {
  type: 'DOMAIN',
  action: 'REGISTER',
  product: 'COM',
}) => {
  const res = await client.users.getPricing(options)
  return res
}
/* end example */

export default GetPricing