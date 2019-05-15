## `dns`

Methods to work with DNS.

- [`dns`](#dns)
  * [`async getHosts(domain: string): Hosts`](#async-gethostsdomain-string-hosts)
    * [`Host`](#type-host)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true" width="25"></a></p>

### `async getHosts(`<br/>&nbsp;&nbsp;`domain: string,`<br/>`): Hosts`

Returns the information about the hosts.

**`Hosts`**: `{ hosts: Host[], Domain: string, EmailType: string, IsUsingOurDNS: boolean }`

__<a name="type-host">`Host`</a>__: The information about the host.

|          Name           |       Type       |                                                       Description                                                       |
| ----------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| __HostId*__             | <em>number</em>  | UniqueID of the host records, e.g., `151362331`.                                                                        |
| __Name*__               | <em>string</em>  | The domain or subdomain for which host record is set, e.g., `*`, `@`.                                                   |
| __Type*__               | <em>string</em>  | The type of host record that is set, e.g., `A`.                                                                         |
| __Address*__            | <em>string</em>  | The value that is set for the host record (IP address for A record, URL for URL redirects, etc.), e.g., `10.28.121.54`. |
| __MXPref*__             | <em>number</em>  | MXPreference number, e.g., `10`.                                                                                        |
| __TTL*__                | <em>number</em>  | TTL value for the host record, e.g., `1799`.                                                                            |
| __IsDDNSEnabled*__      | <em>boolean</em> | false                                                                                                                   |
| __IsActive*__           | <em>boolean</em> | true                                                                                                                    |
| __FriendlyName*__       | <em>string</em>  | ""                                                                                                                      |
| __AssociatedAppTitle*__ | <em>string</em>  | ""                                                                                                                      |

```js
/**
 * @param {string} domain The domain to get hosts for.
 * @param {NameCheap} client
 */
const GetHosts = async (domain, client) => {
  const res = await client.dns.getHosts(domain)
  return res
}
```
```js
{ Domain: 'rqt-example-2019-5-15-20-21-32.com',
  EmailType: 'FWD',
  IsUsingOurDNS: true,
  hosts: 
   [ { HostId: 638036,
       Name: 'www',
       Type: 'CNAME',
       Address: 'parkingpage.namecheap.com.',
       MXPref: 10,
       TTL: 1800,
       AssociatedAppTitle: '',
       FriendlyName: '',
       IsActive: true,
       IsDDNSEnabled: false },
     { HostId: 638037,
       Name: '@',
       Type: 'URL',
       Address: 'http://www.rqt-example-2019-5-15-20-21-32.com?from=@',
       MXPref: 10,
       TTL: 1800,
       AssociatedAppTitle: '',
       FriendlyName: '',
       IsActive: true,
       IsDDNSEnabled: false } ] }
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true" width="25"></a></p>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

<kbd><a href="/">Back To Readme</a></kbd>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>