import bosom from 'bosom'
import NameCheap from '../../../../src'
import GetList from '../../../api/users/address/get-list'
import GetInfo from '../../../api/users/address/get-info'

(async () => {
  const { user, key, ip } = await bosom('.namecheap.json')
  const namecheap = new NameCheap({
    user, key, sandbox: true, ip,
  })
  const addresses = await GetList(namecheap)
  const { AddressId } = addresses.find(({ IsDefault }) => IsDefault)
  const res = await GetInfo(AddressId, namecheap)
  console.log(res)
})()