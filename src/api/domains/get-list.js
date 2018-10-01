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
 * @param {GetList} options Options to get a list of domains.
 * @param {'ALL'|'EXPIRING'|'EXPIRED'} [options.type="ALL"] The type of domains. Default `ALL`.
 * @param {string} [options.filter] The keyword to look for in the domain list.
 * @param {number} [options.page=1] The page to return. Default `1`.
 * @param {number} [options.pageSize=20] The number of domains to be listed on a page. Minimum value is 10, and maximum value is 100. Default `20`.
 * @param {'name'|'expire'|'create'} [options.sort="create"] The field by which to sort domains. If not given, the domains are sorted in descending order by their creation date. Default `create`.
 * @param {boolean} [options.desc=false] Whether to sort in descending order. Default `false`.
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
async function getList(options = {}) {
  const {
    page,
    sort,
    desc,
    filter,
    type,
    pageSize,
  } = options
  const reqOpts = {
    Page: page,
    PageSize: pageSize,
    SortBy: sort ? getSort(sort, desc) : getSort('create', 'desc'),
    SearchTerm: filter,
    ListType: type,
  }
  const res = await this._query(GET_LIST, reqOpts)
  const domain = extractTag('Domain', res)
  const domains = domain.map(({ props }) => {
    /** @type {Domain} */
    const d = props
    return d
  })
  const [{ content: Paging }] = extractTag('Paging', res)
  const [{ content: TotalItems }] = extractTag('TotalItems', Paging)
  const [{ content: CurrentPage }] = extractTag('CurrentPage', Paging)
  const [{ content: PageSize }] = extractTag('PageSize', Paging)
  return {
    domains,
    TotalItems: parseInt(TotalItems, 10),
    CurrentPage: parseInt(CurrentPage, 10),
    PageSize: parseInt(PageSize, 10),
  }
}

export default getList

/* documentary types/api/domains/get-list.xml */
/**
 * @typedef {Object} GetList Options to get a list of domains.
 * @prop {'ALL'|'EXPIRING'|'EXPIRED'} [type="ALL"] The type of domains. Default `ALL`.
 * @prop {string} [filter] The keyword to look for in the domain list.
 * @prop {number} [page=1] The page to return. Default `1`.
 * @prop {number} [pageSize=20] The number of domains to be listed on a page. Minimum value is 10, and maximum value is 100. Default `20`.
 * @prop {'name'|'expire'|'create'} [sort="create"] The field by which to sort domains. If not given, the domains are sorted in descending order by their creation date. Default `create`.
 * @prop {boolean} [desc=false] Whether to sort in descending order. Default `false`.
 *
 * @typedef {Object} Domain
 * @prop {boolean} AutoRenew `false`
 * @prop {string} Created `07/23/2018`
 * @prop {string} Expires `07/23/2019`
 * @prop {number} ID `314928`
 * @prop {boolean} IsExpired `false`
 * @prop {boolean} IsLocked `false`
 * @prop {boolean} IsOurDNS `true`
 * @prop {boolean} IsPremium `false`
 * @prop {string} Name `domain.app`
 * @prop {string} User `user`
 * @prop {string} WhoisGuard `ENABLED`
 */
