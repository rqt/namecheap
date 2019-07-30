import bosom from 'bosom'
import NameCheap from '../../../src'
// import GetList from '../../api/address/get-list'
// import GetInfo from '../../api/address/get-info'

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')
    const nc = new NameCheap({
      user, key, sandbox: true, ip,
    })
    /* start example */
    const addresses =
      await nc.address.getList()
    const { AddressId: id } =
      addresses
        .find(({ IsDefault }) =>
          IsDefault)
    const res =
      await nc.address.getInfo(id)
    /* end example */
    console.log(res)
  } catch ({ message }) {
    console.log(message)
  }
})()