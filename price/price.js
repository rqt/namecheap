import bosom from 'bosom'
import write from '@wrote/write'
import NameCheap from '../src'

const types = (s) => {
  return `<types>
${s}
</types>`
}
const type = (s, name, desc) => {
  return `  <type name="${name}" desc="${desc}">${s}
  </type>`
}

/** @param {NameCheap} client */
const SSL = async (client) => {
  const res = await client.users.getPricing({
    type: 'SSLCERTIFICATE',
  })
  let purchase = ''
  Object.keys(res.ssl.purchase).forEach((p) => {
    const v = res.ssl.purchase[p]
    const d = getDesc(desc[p])
    purchase += `
    <prop type="Product" name="${p}">
      ${d}1-year purchase: \`${v[0].Price} USD\`
    </prop>`
  })
  purchase = type(purchase, 'SSLPurchase', 'The pricing to purchase certificates.')
  let renew
  Object.keys(res.ssl.renew).forEach((p) => {
    const v = res.ssl.renew[p]
    const d = getDesc(desc[p])
    renew += `
    <prop type="Product" name="${p}">
      ${d}1-year renewal: \`${v[0].Price} USD\`
    </prop>`
  })
  renew = type(renew, 'SSLRenew', 'The pricing to renew certificates.')
  const tt = [purchase, renew].join('\n')
  const s = types(tt)
  return s
}

/** @param {NameCheap} client */
const Whois = async (client) => {
  const { whoisguard } = await client.users.getPricing({
    type: 'WHOISGUARD',
  })
  let purchase = ''
  Object.keys(whoisguard.purchase).forEach((p) => {
    const v = whoisguard.purchase[p]
    purchase += `
    <prop type="Product" name="${p}">
      1-year purchase: \`${v[0].Price} USD\`
    </prop>`
  })
  purchase = type(purchase, 'WhoisPurchase', 'The pricing to purchase WHOIS guards.')
  let renew
  Object.keys(whoisguard.renew).forEach((p) => {
    const v = whoisguard.renew[p]
    renew += `
    <prop type="Product" name="${p}">
      1-year renewal: \`${v[0].Price} USD\`
    </prop>`
  })
  renew = type(renew, 'WhoisRenew', 'The pricing to renew WHOIS guards.')
  const tt = [purchase, renew].join('\n')
  const s = types(tt)
  return s
}

(async () => {
  const { user, key, ip } = await bosom('.namecheap.json')
  const namecheap = new NameCheap({
    user, key, sandbox: true, ip,
  })
  const ssl = await SSL(namecheap)
  await write('types/api/users/pricing/ssl.xml', ssl)
  const whois = await Whois(namecheap)
  await write('types/api/users/pricing/whois.xml', whois)
})()

const getDesc = (d) => {
  if (!d) return ''
  const [n, l] = d
  const link = `https://www.namecheap.com/security/ssl-certificates/${l}`
  const name = `_${n}_`
  const s = `${name} ${link}. `
  return s
}

const desc = {
  positivessl: [
    'PositiveSSL',
    'comodo/positivessl.aspx',
  ],
  positivesslWildcard: [
    'PositiveSSL Wildcard',
    'comodo/positivessl-wildcard.aspx',
  ],
  positivesslMultiDomain: [
    'PositiveSSL Multi-Domain',
    'comodo/positivessl-multi-domain.aspx',
  ],
  essentialssl: [
    'EssentialSSL',
    'comodo/essentialssl.aspx',
  ],
  essentialsslWildcard: [
    'EssentialSSL Wildcard',
    'comodo/essentialssl-wildcard.aspx',
  ],
  instantssl: [
    'InstantSSL',
    'comodo/instantssl.aspx',
  ],
  instantsslPro: [
    'InstantSSL Pro',
    'comodo/instantssl-pro.aspx',
  ],
  premiumssl: [
    'PremiumSSL',
    'comodo/premiumssl.aspx',
  ],
  premiumsslWildcard: [
    'PremiumSSL Wildcard',
    'comodo/premiumssl-wildcard.aspx',
  ],
  evSsl: [
    'EV SSL',
    'comodo/ev.aspx',
  ],
  comodosslEvMultiDomainSsl: [
    'EV Multi-Domain SSL',
    'comodo/ev-multi-domain-ssl.aspx',
  ],
  comodosslMultiDomainSsl: [
    'Multi-Domain SSL',
    'comodo/multi-domain-ssl.aspx',
  ],
  unifiedCommunications: [
    'Unified Communications',
    'comodo/unified-communications.aspx',
  ],
}