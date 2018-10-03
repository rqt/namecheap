import bosom from 'bosom'
import NameCheap from '../../../src'
import Create from '../../api/domains/create'
import GetList from '../../api/domains/get-list'

(async () => {
  const { user, key, ip } = await bosom('.namecheap.json')
  const namecheap = new NameCheap({
    user, key, sandbox: true, ip,
  })
  const d = new Date().toLocaleString().replace(/[ :]/g, '-')
  const domain = `rqt-example-${d}.com`
  await Create(domain, namecheap)
  const res = await GetList(domain, namecheap)
  console.log(res)
})()