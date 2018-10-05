import bosom from 'bosom'
import NameCheap from '../../../src'
import Check from '../../api/domains/check'

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })
    const res = await Check('example.com', namecheap)
    console.log(res)
  } catch ({ message }) {
    console.log(message)
  }
})()