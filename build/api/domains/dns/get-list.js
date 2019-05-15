let extractTag = require('rexml'); if (extractTag && extractTag.__esModule) extractTag = extractTag.default;

const GET_LIST = 'namecheap.domains.dns.getList'

async function getList(query, options) {
  const {
    sld,
    tld,
  } = options
  const reqOpts = {
    SLD: sld,
    TLD: tld,
  }
  const res = await query(GET_LIST, reqOpts)
  const domain = extractTag('DomainDNSGetListResult', res)
  const domains = domain.map(({ props }) => {
    /** @type {Domain} */
    const d = props
    return d
  })
}

module.exports=getList