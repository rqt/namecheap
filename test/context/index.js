import { resolve, join } from 'path'
import { debuglog } from 'util'
import bosom from 'bosom'
import read from '@wrote/read'

const LOG = debuglog('@rqt/namecheap')

const FIXTURE = resolve('test/fixture')

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    LOG('init context')
    const { user, key, ip } = await bosom('.namecheap.json')
    this.user = user
    this.key = key
    this.ip = ip
  }
  get address() {
    return {
      Address1: 'Planetary Express',
      Address2: '57th Street',
      AddressId: 837703,
      AddressName: 'Main Address',
      City: 'New New York',
      Country: 'US',
      Default_YN: true,
      EmailAddress: 'test@adc.sh',
      FirstName: 'Art',
      JobTitle: 'Director',
      LastName: 'Deco',
      Organization: 'Art Deco Code Limited',
      Phone: '+1.5417543010',
      PhoneExt: '',
      StateProvince: '',
      StateProvinceChoice: 'P',
      UserName: 'test',
      Zip: '10019',
    }
  }
  async readInvalidRequestIp() {
    const res = await read(join(FIXTURE, 'InvalidRequestIp.xml'))
    return res
  }
  async readAddresses() {
    const res = await read(join(FIXTURE, 'Addresses.xml'))
    return res
  }
  /**
   * Example method.
   */
  example() {
    return 'OK'
  }
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  async _destroy() {
    LOG('destroy context')
  }
}