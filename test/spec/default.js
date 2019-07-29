import { equal, ok, deepEqual } from '@zoroaster/assert'
import Context from '../context'
import NameCheap from '../../src'
import { getAddressObject } from '../../src/api/domains/create'
import { getError } from '../../src/lib/query'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'integration'({ ip, user, key }) {
    const namecheap = new NameCheap({
      user, ip, key, sandbox: true,
    })
    const d = new Date().toLocaleString().replace(/[ :]/g, '-')
    const domain = `rqt-${d}.com`
    const free = await namecheap.domains.check(domain)
    ok(free[0].Available)

    const cc = await namecheap.address.getList()
    const { AddressId } = cc.find(({ IsDefault }) => IsDefault)
    const address = await namecheap.address.getInfo(AddressId)
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
    assertKeys(['CreatedDate', 'ExpiredDate', 'NumYears'], DomainDetails)
    equal(res3.DomainName, domain)
    equal(res3.Status, 'Ok')

    return DnsDetails
  },
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