/**
 * @typedef {import('../../../src').default} NameCheap
 */
/* start example */
/**
 * @param {string} domain The domain to check.
 * @param {NameCheap} client
 */
const Check = async (domain, client) => {
  // Check a domain with options (returned in an array).
  await client.domains.check({
    domain,
  })

  // Check a domain with string (returned in an array).
  await client.domains.check(domain)

  // Check multiple domains.
  const array = await client.domains.check({
    domains: [
      domain,
      domain.replace('.com', '.net'),
    ],
  })

  return array
}
/* end example */

export default Check