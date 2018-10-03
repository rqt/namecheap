import bosom from 'bosom'
import NameCheap from '../../../src'
import Create from '../../api/domains/create'

(async () => {
  const { user, key, ip } = await bosom('.namecheap.json')
  const namecheap = new NameCheap({
    user, key, sandbox: true, ip,
  })
  const d = new Date().toLocaleString().replace(/[ :]/g, '-')
  const domain = `rqt-example-${d}.com`
  const res = await Create(domain, namecheap)
  console.log(res)
})()