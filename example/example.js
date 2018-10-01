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
    const r = await namecheap.domains.create({
      domain: 'example-test.com',
    })
    debugger
  } catch (err) {
    console.log(err)
  }
})()