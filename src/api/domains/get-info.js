import extractTags from 'rexml'

const COMMAND = 'namecheap.domains.getinfo'

const parseWhois = (Whoisguard) => {
  let ID
  let ExpiredDate
  let EmailDetails
  ([{ content: ID }] = extractTags('ID', Whoisguard))
  try {
    ([{ props: EmailDetails }] = extractTags('EmailDetails', Whoisguard))
  } catch (err) {
    // ok
  }
  try {
    ([{ content: ExpiredDate }] = extractTags('ExpiredDate', Whoisguard))
  } catch (err) {
    // ok
  }
  return {
    ID: parseInt(ID, 10),
    ...(ExpiredDate ? { ExpiredDate } : {}),
    ...(EmailDetails ? { EmailDetails } : {}),
  }
}

const parsePremiumDNS = (dns) => {
  const [{ content: UseAutoRenew }] = extractTags('UseAutoRenew', dns)
  const [{ content: SubscriptionId }] = extractTags('SubscriptionId', dns)
  const [{ content: CreatedDate }] = extractTags('CreatedDate', dns)
  const [{ content: ExpirationDate }] = extractTags('ExpirationDate', dns)
  const [{ content: IsActive }] = extractTags('IsActive', dns)
  return {
    UseAutoRenew: UseAutoRenew == 'true',
    SubscriptionId: parseInt(SubscriptionId, 10),
    CreatedDate: new Date(Date.parse(CreatedDate)),
    ExpirationDate: new Date(Date.parse(ExpirationDate)),
    IsActive: IsActive == true,
  }
}

export const parse = (res) => {
  const [{
    content: DomainGetInfoResult,
    props,
  }] = extractTags('DomainGetInfoResult', res)
  const [{
    content: DomainDetails,
  }] = extractTags('DomainDetails', DomainGetInfoResult)
  const [{ content: CreatedDate }] = extractTags('CreatedDate', DomainDetails)
  const [{ content: ExpiredDate }] = extractTags('ExpiredDate', DomainDetails)
  const [{ content: NumYears }] = extractTags('NumYears', DomainDetails)
  const [{
    content: Whoisguard,
    props: WhoisProps,
  }] = extractTags('Whoisguard', DomainGetInfoResult)
  const whois = parseWhois(Whoisguard)

  const [{
    content: PremiumDnsSubscription,
  }] = extractTags('PremiumDnsSubscription', DomainGetInfoResult)
  const premiumDns = parsePremiumDNS(PremiumDnsSubscription)

  const [{
    content: DnsDetails,
    props: DnsProps,
  }] = extractTags('DnsDetails', DomainGetInfoResult)
  const Nameserver = extractTags('Nameserver', DnsDetails)
    .map(({ content }) => content)

  const [{
    content: Modificationrights,
    props: ModificationrightsProps,
  }] = extractTags('Modificationrights', DomainGetInfoResult)
  let rights = {}
  if (Modificationrights) {
    rights = extractTags('Rights', Modificationrights)
      .reduce((acc, { props: p }) => {
        const { Type } = p
        return {
          ...acc,
          [Type]: true,
        }
      }, {})
  }

  const d = {
    ...props,
    DomainDetails: {
      CreatedDate,
      ExpiredDate,
      NumYears: parseInt(NumYears, 10),
    },
    Whoisguard: {
      ...WhoisProps,
      ...whois,
    },
    PremiumDnsSubscription: premiumDns,
    DnsDetails: {
      ...DnsProps,
      Nameserver,
    },
    Modificationrights: {
      ...ModificationrightsProps,
      ...rights,
    },
  }
  return d
}

/**
 * Returns information about the requested domain.
 * @param {!Function} query
 * @param {string|_namecheap.GetInfo} options The domain name, or options to get info about a domain.
 * @example
 *
 * // Obtain information for the testt.cc domain:
 * await nc.domains.getInfo({ domain: 'testt.cc' })
 * await nc.domains.getInfo('testt.cc')
 *
 * // Result:
 * { Status: 'Ok',
 *  ID: 30072635,
 *  DomainName: 'testt.cc',
 *  OwnerName: 'artdeco',
 *  IsOwner: true,
 *  IsPremium: false,
 *  DomainDetails:
 *   { CreatedDate: '06/06/2018',
 *     ExpiredDate: '06/06/2019',
 *     NumYears: 0 },
 *  Whoisguard:
 *   { Enabled: 'True',
 *     ID: 23996873,
 *     ExpiredDate: '06/05/2019',
 *     EmailDetails:
 *      { WhoisGuardEmail: 'ff474db8ad3b4c3b95a2b0f3b3a73acc.protect[at]whoisguard.com',
 *        ForwardedTo: 'example[at]adc.sh',
 *        LastAutoEmailChangeDate: '',
 *        AutoEmailChangeFrequencyDays: 0 } },
 *  PremiumDnsSubscription:
 *   { UseAutoRenew: false,
 *     SubscriptionId: -1,
 *     CreatedDate: 0001-01-01T00:00:00.000Z,
 *     ExpirationDate: 0001-01-01T00:00:00.000Z,
 *     IsActive: false },
 *  DnsDetails:
 *   { ProviderType: 'CUSTOM',
 *     IsUsingOurDNS: false,
 *     HostCount: 2,
 *     EmailType: 'FWD',
 *     DynamicDNSStatus: false,
 *     IsFailover: false,
 *     Nameserver:
 *      [ 'ns-1013.awsdns-62.net',
 *        'ns-1311.awsdns-35.org',
 *        'ns-1616.awsdns-10.co.uk',
 *        'ns-355.awsdns-44.com' ] },
 *  Modificationrights: { All: true } }
 */
async function getInfo(query, options) {
  const opts = typeof options == 'string' ? { domain: options } : options
  const {
    domain,
    host,
  } = opts
  const res = await query(COMMAND, {
    'DomainName': domain,
    'HostName': host,
  })

  /** @type {!_namecheap.DomainInfo} */
  const d = parse(res)
  return d
}

export default getInfo

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/typedefs/domains').DomainInfo} _namecheap.DomainInfo
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/typedefs/domains').GetInfo} _namecheap.GetInfo
 */