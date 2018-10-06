import bosom from 'bosom'
import NameCheap from '../../../src'
import GetList from '../../api/address/get-list'
import GetInfo from '../../api/address/get-info'

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })
    const addresses = await GetList(namecheap)
    const { AddressId } = addresses.find(({ IsDefault }) => IsDefault)
    const res = await GetInfo(AddressId, namecheap)
    console.log(res)
  } catch ({ message }) {
    console.log(message)
  }
})()