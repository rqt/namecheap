import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import namecheap from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await namecheap({
      text: input,
    })
    return res
  },
  context: Context,
})

// export default ts