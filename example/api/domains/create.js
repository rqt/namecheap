/* start example */
/**
 * @param {string} domain The domain to register.
 * @param {NameCheap} client
 */
const Create = async (domain, client) => {
  // Find the default address.
  const ad = await client.users.address.getList()
  const { AddressId } = ad.find(({ IsDefault }) => IsDefault)
  const address = await client.users.address.getInfo(AddressId)

  // Register a domain.
  const res = await client.domains.create({
    domain,
    address,
  })
  return res
}
/* end example */

export default Create