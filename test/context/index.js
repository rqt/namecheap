import { resolve } from 'path'
import { debuglog } from 'util'
import bosom from 'bosom'

const LOG = debuglog('@rqt/namecheap')

const FIXTURE = resolve(__dirname, '../fixture')

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