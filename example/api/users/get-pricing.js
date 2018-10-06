/**
 * @typedef {import('../../../src').default} NameCheap
 */
/* start example */
/**
 * @param {NameCheap} client
 */
const GetPricing = async (client) => {
  const res = await client.users.getPricing({
    type: 'DOMAIN',
    action: 'REGISTER',
    product: 'COM',
  })
  return res
}
/* end example */

export default GetPricing