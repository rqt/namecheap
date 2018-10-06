import bosom from 'bosom'
import NameCheap from '../../../src'
import GetPricing from '../../api/users/get-pricing'

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })
    const res = await GetPricing(namecheap)
    console.log(JSON.stringify(res, null, 2))
  } catch ({ message, props }) {
    console.log(message)
  }
})()