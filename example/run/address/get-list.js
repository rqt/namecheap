import bosom from 'bosom'
import NameCheap from '../../../src'
import GetList from '../../api/address/get-list'

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })
    const res = await GetList(namecheap)
    console.log(res)
  } catch ({ message }) {
    console.log(message)
  }
})()