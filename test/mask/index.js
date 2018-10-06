import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import NameCheap from '../../src'

const pricing = makeTestSuite('test/result/users/get-pricing', {
  /**
   * @param {string} input
   * @param {Context} c
   */
  async getResults(input, { key, user, ip }) {
    const nc = new NameCheap({
      ip, key, user, sandbox: true,
    })
    const [path, options] = JSON.parse(input)
    const [d, m] = path.split('.')
    const res = await nc[d][m](options)
    return res
  },
  jsonProps: ['expected'],
  context: Context,
})

// export default ts
export { pricing }