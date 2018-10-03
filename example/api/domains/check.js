/* start example */
/**
 * @param {string} domain The domain to check.
 * @param {NameCheap} client
 */
const Check = async (domain, client) => {
  // Check a domain with options.
  const options = await client.domains.check({
    domain,
  })

  // Simplified checking of a domain with a string.
  const string = await client.domains.check(domain)

  // Check multiple domains.
  const array = await client.domains.check({
    domains: [
      domain,
      domain.replace('.com', '.net'),
    ],
  })

  return {
    options,
    string,
    array,
  }
}
/* end example */

export default Check