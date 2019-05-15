import extractTag from 'rexml'

const COMMAND = 'namecheap.domains.dns.getHosts'

async function getList(query, { sld, tld }) {
  const reqOpts = {
    'SLD': sld,
    'TLD': tld,
  }
  const res = await query(COMMAND, reqOpts)
  const [{ content, props }] = extractTag('DomainDNSGetHostsResult', res)
  const hosts1 = getHosts(content, 'Host')
  const hosts2 = getHosts(content, 'host')
  const hosts3 = getHosts(content, 'HOST')
  const hosts = [...hosts1, ...hosts2, ...hosts3]
  const p = /** @type {{ IsUsingOurDNS: boolean, Domain: string, EmailType: string }} */ (props)
  const r = {
    ...p,
    hosts,
  }
  return r
}

const getHosts = (content, tag) => {
  return extractTag(tag, content).map(({ props }) => {
    return /** @type {_namecheap.Host} */ (props)
  })
}

export default getList

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../../types/typedefs').Host} _namecheap.Host
 */