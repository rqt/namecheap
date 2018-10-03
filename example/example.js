/* yarn example/ */
import NameCheap from '../src'
import bosom from 'bosom'

(async () => {
  try {
    // 0. Create a client.
    const { user, key, ip } = await bosom('.namecheap.json')
    const namecheap = new NameCheap({
      user, key, sandbox: true, ip,
    })

    // 1. Check a domain.
    const c = await namecheap.domains.check('test.co')
    console.log('Check:', c, '\n')

    // 2. Get list of addresses on the account.
    const cc = await namecheap.users.address.getList()
    console.log('Addresses:', cc, '\n')

    // 3. Find the default address and get its info.
    const { AddressId } = cc.find(({ IsDefault }) => IsDefault)
    const address = await namecheap.users.address.getInfo(AddressId)

    // 4. Register the domain using the address.
    const d = new Date().toLocaleString().replace(/[ :]/g, '-')
    const domain = `rqt-example-${d}.com`
    const r = await namecheap.domains.create({
      domain,
      address,
    })
    console.log('Registered:', r, '\n')


    // 5. Retrieve info about domain.
    const info = await namecheap.domains.getInfo(domain)
    console.log('Info:', info, '\n')

    // 6. Get a list of domains (with filter).
    const list = await namecheap.domains.getList({
      filter: domain,
    })
    console.log('List:', list, '\n')
  } catch (err) {
    console.log(err)
  }
})()