import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import NameCheap from '../../src'

const pricing = makeTestSuite('test/result/users/get-pricing', {
  /**
   * @param {Context} c
   */
  async getResults({ key, user, ip }) {
    const nc = new NameCheap({
      ip, key, user, sandbox: true,
    })
    const [path, options] = JSON.parse(this.input)
    const [d, m] = path.split('.')
    const res = await nc[d][m](options)
    return res
  },
  jsonProps: ['expected'],
  context: Context,
})

// export default ts
export { pricing }