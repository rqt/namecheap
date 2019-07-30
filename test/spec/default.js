import { equal, ok, deepEqual, throws } from '@zoroaster/assert'
import Context, { rc } from '../context'
import NameCheap from '../../src'
import { getAddressObject } from '../../src/api/domains/create'
import { getError } from '../../src/lib/query'

class Integration {
  async _init() {
    const { user, key, ip } = await rc
    const namecheap = new NameCheap({
      user, ip, key, sandbox: true,
    })
    this.namecheap = namecheap
    const d = new Date().toLocaleString().replace(/[ :]/g, '-')
    this.domain = `rqt-${d}.com`
    this.prereg = 'node-test.app'
  }
  set(obj) {
    Object.assign(this, obj)
  }
}

/** @type {Object<string, (i: Integration)} */
export const integration = {
  context: Context,
  persistentContext: Integration,
  async 'address.getList'({ namecheap, set }) {
    const addressList = await namecheap.address.getList()
    ok(Array.isArray(addressList))
    set({ addressList })
    return addressList
  },
  async 'address.getInfo'({ namecheap, set, addressList }) {
    ok(addressList)
    const { AddressId } = addressList.find(({ IsDefault }) => IsDefault)
    const address = await namecheap.address.getInfo(AddressId)
    assertKeys(['AddressId', 'UserName', 'AddressName', 'Default_YN', 'FirstName', 'LastName', 'JobTitle', 'Organization', 'Address1', 'Address2', 'City', 'StateProvince', 'StateProvinceChoice', 'Zip', 'Country', 'Phone', 'PhoneExt', 'EmailAddress',
    ], address)
    set({ address })
    return address
  },
  async 'domains.check'({ namecheap, domain }) {
    const free = await namecheap.domains.check(domain)
    ok(free[0].Available)
    free[0].Domain = 'testing.com'
    return free
  },
  async 'domains.create'({ namecheap, domain, address, set }) {
    ok(address)
    const registered = await namecheap.domains.create({
      domain,
      address,
    })
    assertKeys(['ChargedAmount', 'Domain', 'DomainID', 'FreePositiveSSL', 'NonRealTimeDomain', 'OrderID', 'Registered', 'TransactionID', 'WhoisguardEnable',
    ], registered)
    ok(registered.Registered)
    ok(registered.WhoisguardEnable)
    equal(registered.Domain, domain)
    set({ registered })
  },
  async 'domains.create (error)'({ namecheap, address }) {
    ok(address)
    await throws({
      fn: namecheap.domains.create,
      args: [{
        domain: 'namecheap-test.app',
        address,
      }],
      stack: /domains\.create \(error\)/,
    })
  },
  async 'domains.getList'({ namecheap, prereg }) {
    const res = await namecheap.domains.getList({
      filter: prereg,
    })
    equal(res.TotalItems, 1)
    equal(res.PageSize, 20)
    equal(res.CurrentPage, 1)
    const [l] = res.domains
    assertKeys(['AutoRenew', 'Created', 'Expires', 'ID', 'IsExpired', 'IsLocked', 'IsOurDNS', 'IsPremium', 'Name', 'User', 'WhoisGuard',
    ], l)
    return l
  },
  async 'domains.getInfo'({ namecheap, prereg }) {
    const res2 = await namecheap.domains.getInfo(prereg)
    const res3 = await namecheap.domains.getInfo({ domain: prereg })
    deepEqual(res2, res3)
    const { DomainDetails } = res3
    assertKeys(['CreatedDate', 'ExpiredDate', 'NumYears'], DomainDetails)
    equal(res3.DomainName, prereg)
    equal(res3.Status, 'Ok')

    res3.PremiumDnsSubscription.CreatedDate = `${
      res3.PremiumDnsSubscription.CreatedDate.toISOString()}`
    res3.PremiumDnsSubscription.ExpirationDate = `${
      res3.PremiumDnsSubscription.ExpirationDate.toISOString()}`

    return res3
  },
}

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'extracts a keyed address from a raw address'({ address }) {
    const res = getAddressObject(address, 'Registrant')
    deepEqual(res, {
      RegistrantOrganizationName: address.Organization,
      RegistrantJobTitle: address.JobTitle,
      RegistrantFirstName: address.FirstName,
      RegistrantLastName: address.LastName,
      RegistrantAddress1: address.Address1,
      RegistrantAddress2: address.Address2,
      RegistrantCity: address.City,
      RegistrantStateProvince: 'NA',
      RegistrantStateProvinceChoice: address.StateProvinceChoice,
      RegistrantPostalCode: address.Zip,
      RegistrantCountry: address.Country,
      RegistrantPhone: address.Phone,
      RegistrantPhoneExt: address.PhoneExt,
      RegistrantFax: address.Fax,
      RegistrantEmailAddress: address.EmailAddress,
    })
  },
  async 'extracts an error'({ readInvalidRequestIp }) {
    const InvalidRequestIp = await readInvalidRequestIp()
    const error = getError(InvalidRequestIp)
    ok(error instanceof Error)
    equal(error.message, 'Invalid request IP: 82.132.224.85')
    deepEqual(error.props, {
      Number: 1011150,
    })
  },
  async 'does not extract an error'({ readAddresses }) {
    const Addresses = await readAddresses()
    const error = getError(Addresses)
    equal(error, undefined)
  },
}

const assertKeys = (keys, obj) => {
  deepEqual(keys.sort(), Object.keys(obj).sort())
}

export default T