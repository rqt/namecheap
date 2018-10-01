import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import namecheap from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof namecheap, 'function')
  },
  async 'calls package without error'() {
    await namecheap()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await namecheap({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T