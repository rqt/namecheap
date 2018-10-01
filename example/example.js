/* yarn example/ */
import NameCheap from '../src'
import bosom from 'bosom'

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })
    const res = await namecheap.domains.getList()
    const s = res.domains
      .map(({ Name, Expires }) => `${Name}: ${Expires}`)
      .join('\n')
    console.log(s)
    const res2 = await namecheap.domains.getInfo('alamode.app')
    const c = await namecheap.domains.check('test.co')
    console.log(c)
    const cc = await namecheap.users.address.getList()
    console.log(cc)
    const { AddressId } = cc.find(({ IsDefault }) => IsDefault)
    const address = await namecheap.users.address.getInfo(AddressId)
    const r = await namecheap.domains.create({
      domain: 'example-test-100.com',
      address,
    })
    console.log(r)
    debugger
  } catch (err) {
    console.log(err)
  }
})()