import extractTag from 'rexml'

const GET_LIST = 'namecheap.domains.getList'

const m = {
  name: 'name',
  expire: 'expiredate',
  create: 'createdate',
}

/**
 * @param {string} sort
 */
const getSort = (sort, desc) => {
  if (!['name', 'expire', 'create'].includes(sort.toLowerCase())) {
    throw new Error(`Unknown sort by option: ${sort}.`)
  }
  const s = m[sort].toUpperCase()
  if (desc) return `${s}_DESC`
  return s
}

/**
 * Returns a list of domains for the particular user.
 * @param {!Function} query
 * @param {!_namecheap.GetList} options Options to get a list of domains. https://www.namecheap.com/support/api/methods/domains/get-list.aspx
 * @example
 *
  // Get information about domains in the `.app` zone sorted by descending  create date (oldest first)
  await nc.domains.getList({
   sort: 'create',
   desc: true,
   filter: '.app',
  })

  // Result:
  {
   domains: [
     {
       ID: 30071047,
       Name: 'example.app',
       User: 'artdeco',
       Created: '06/05/2018',
       Expires: '06/05/2019',
       IsExpired: false,
       IsLocked: false,
       AutoRenew: true,
       WhoisGuard: 'ENABLED',
       IsPremium: false,
       IsOurDNS: false
     },
     {
       ID: 30072635,
       Name: 'test.app',
       User: 'artdeco',
       Created: '06/06/2018',
       Expires: '06/06/2019',
       IsExpired: false,
       IsLocked: false,
       AutoRenew: true,
       WhoisGuard: 'ENABLED',
       IsPremium: false,
       IsOurDNS: false
     },
   ],
   TotalItems: 2,
   CurrentPage: 1,
   PageSize: 20,
  }
 */
async function getList(query, options = {}) {
  const {
    page,
    sort,
    desc,
    filter,
    type,
    pageSize,
  } = options
  const reqOpts = {
    'Page': page,
    'PageSize': pageSize,
    'SortBy': sort ? getSort(sort, desc) : getSort('create', 'desc'),
    'SearchTerm': filter,
    'ListType': type,
  }
  const res = await query(GET_LIST, reqOpts)
  const domain = extractTag('Domain', res)
  const domains = domain.map(({ props }) => {
    /** @type {!_namecheap.Domain} */
    const d = props
    return d
  })
  const [{ content: Paging }] = extractTag('Paging', res)
  const [{ content: TotalItems }] = extractTag('TotalItems', Paging)
  const [{ content: CurrentPage }] = extractTag('CurrentPage', Paging)
  const [{ content: PageSize }] = extractTag('PageSize', Paging)

  return {
    domains: domains,
    TotalItems: parseInt(TotalItems, 10),
    CurrentPage: parseInt(CurrentPage, 10),
    PageSize: parseInt(PageSize, 10),
  }
}

export default getList

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/typedefs/domains').Domain} _namecheap.Domain
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/typedefs/domains').GetList} _namecheap.GetList
 */