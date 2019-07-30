import bosom from 'bosom'
import NameCheap from '../../../src'
// import Create from '../../api/domains/create'
// import GetHosts from '../../api/dns/get-hosts'

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')

    // const d = new Date().toLocaleString().replace(/[ :]/g, '-')
    // const domain = `rqt-example-${d}.com`
    // await Create(domain, namecheap)
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })
    /* start example */
    const res = await namecheap.dns.getHosts('node-test.app')
    console.log(res)
    /* end example */
  } catch ({ message }) {
    console.log(message)
  }
})()

