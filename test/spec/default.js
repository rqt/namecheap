import { equal, ok, deepEqual } from 'zoroaster/assert'
import Context from '../context'
import NameCheap from '../../src'
import SnapshotContext from 'snapshot-context'

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [Context, SnapshotContext],
  async 'integration'({ ip, user, key, SNAPSHOT_DIR }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const namecheap = new NameCheap({
      user, ip, key, sandbox: true,
    })
    const d = new Date().toLocaleString().replace(/[ :]/g, '-')
    const domain = `rqt-${d}.com`
    const free = await namecheap.domains.check(domain)
    ok(free[0].Available)

    const cc = await namecheap.users.address.getList()
    const { AddressId } = cc.find(({ IsDefault }) => IsDefault)
    const address = await namecheap.users.address.getInfo(AddressId)
    assertKeys(['AddressId', 'UserName', 'AddressName', 'Default_YN', 'FirstName', 'LastName', 'JobTitle', 'Organization', 'Address1', 'Address2', 'City', 'StateProvince', 'StateProvinceChoice', 'Zip', 'Country', 'Phone', 'PhoneExt', 'EmailAddress',
    ], address)

    const registered = await namecheap.domains.create({
      domain,
      address,
    })
    assertKeys(['ChargedAmount', 'Domain', 'DomainID', 'FreePositiveSSL', 'NonRealTimeDomain', 'OrderID', 'Registered', 'TransactionID', 'WhoisguardEnable',
    ], registered)
    ok(registered.Registered)
    ok(registered.WhoisguardEnable)
    equal(registered.Domain, domain)

    const res = await namecheap.domains.getList({
      filter: domain,
    })
    equal(res.TotalItems, 1)
    equal(res.PageSize, 20)
    equal(res.CurrentPage, 1)
    const [l] = res.domains
    assertKeys(['AutoRenew', 'Created', 'Expires', 'ID', 'IsExpired', 'IsLocked', 'IsOurDNS', 'IsPremium', 'Name', 'User', 'WhoisGuard',
    ], l)
    const res2 = await namecheap.domains.getInfo(domain)
    const res3 = await namecheap.domains.getInfo({ domain })
    deepEqual(res2, res3)
    const { DnsDetails, DomainDetails } = res3
    await test('dns-details.json', DnsDetails)
    assertKeys(['CreatedDate', 'ExpiredDate', 'NumYears'], DomainDetails)
    equal(res3.DomainName, domain)
    equal(res3.Status, 'Ok')
  },
}

const assertKeys = (keys, obj) => {
  deepEqual(keys.sort(), Object.keys(obj).sort())
}

export default T