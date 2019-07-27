import bosom from 'bosom'
import NameCheap from '../../../src'
import Create from '../../api/domains/create'

(async () => {
  try {
    const { user, key, ip } = await bosom('.namecheap.json')
    const client = new NameCheap({
      user, key, sandbox: true, ip,
    })
    const d = new Date().toLocaleString().replace(/[ :]/g, '-')
    const domain = `rqt-example-${d}.com`
    await Create(domain, client)
    /* start example */
    const { hosts } = await client.dns.getHosts(domain)
    hosts.forEach(h => {
      h.HostName = h.Name
      h.RecordType = h.Type
    })

    const res = await client.dns.setHosts(domain, [...hosts, {
      Address: '192.168.1.0',
      RecordType: 'A',
      HostName: '@',
    }])
    console.log('Result:', res)

    const { hosts: updated } = await client.dns.getHosts(domain)
    console.log('Updated: ', updated)
    /* end example */
  } catch ({ message }) {
    console.log(message)
  }
})()

