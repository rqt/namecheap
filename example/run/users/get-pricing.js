import bosom from 'bosom'
import NameCheap from '../../../src'
import GetPricing from '../../api/users/get-pricing'

const type = process.argv[3];

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })
    let options
    if (type == 'SSL') options = { type: 'SSLCERTIFICATE', action: 'PURCHASE' }
    let res = await GetPricing(namecheap, options)
    console.log(JSON.stringify(res, null, 2))
  } catch ({ message, props }) {
    console.log(message)
  }
})()