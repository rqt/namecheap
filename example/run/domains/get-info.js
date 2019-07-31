import bosom from 'bosom'
import NameCheap from '../../../src'
// import Create from '../../api/domains/create'
// import GetInfo from '../../api/domains/get-info'

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })
    // const d = new Date().toLocaleString().replace(/[ :]/g, '-')
    // const domain = `rqt-example-${d}.com`
    // await Create(domain, namecheap)
    // const res = // await GetInfo(domain, namecheap)
    /* start example */
    const res = await namecheap.domains.getInfo('node-test.app')
    console.log(res)
    /* end example */
  } catch ({ message }) {
    console.log(message)
  }
})()