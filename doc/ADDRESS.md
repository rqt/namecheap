## `address`

Methods to manipulate addresses. In contrast to the NameCheap API, it does not fall under the group `users`.

- [`address`](#address)
  * [`async getInfo(id: string|number): AddressDetail`](#async-getinfoid-stringnumber-addressdetail)
  * [`async getList(): Address[]`](#async-getlist-address)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true" width="25"></a></p>





### `async getInfo(`<br/>&nbsp;&nbsp;`id: string|number,`<br/>`): AddressDetail`

Gets information for the requested address ID.

__<a name="type-addressdetail">`AddressDetail`</a>__

|           Name           |      Type       |                        Description                        |
| ------------------------ | --------------- | --------------------------------------------------------- |
| __EmailAddress*__        | <em>string</em> | Email address of the user.                                |
| __FirstName*__           | <em>string</em> | First name of the user.                                   |
| __LastName*__            | <em>string</em> | Last name of the user.                                    |
| JobTitle                 | <em>string</em> | Job designation of the user                               |
| Organization             | <em>string</em> | Organization of the user.                                 |
| __Address1*__            | <em>string</em> | StreetAddress1 of the user.                               |
| Address2                 | <em>string</em> | StreetAddress2 of the user.                               |
| __City*__                | <em>string</em> | City of the user.                                         |
| __StateProvince*__       | <em>string</em> | State/Province of the user.                               |
| __StateProvinceChoice*__ | <em>string</em> | State/Province choice of the user. Either `'S'` or `'P'`. |
| __Zip*__                 | <em>string</em> | Zip/Postal code of the user.                              |
| __Country*__             | <em>string</em> | Two letter country code of the user.                      |
| __Phone*__               | <em>string</em> | Phone number in the format `+NNN.NNNNNNNNNN`.             |
| PhoneExt                 | <em>string</em> | PhoneExt of the user.                                     |
| Fax                      | <em>string</em> | Fax number in the format `+NNN.NNNNNNNNNN`.               |

```js
/**
 * @param {string|number} id The address to get info about.
 * @param {NameCheap} client
 */
const GetInfo = async (id, client) => {
  const res = await client.address.getInfo(id)
  return res
}
```
```js
{ AddressId: 101235,
  UserName: 'zavr',
  AddressName: 'Planet Express',
  Default_YN: true,
  FirstName: 'John',
  LastName: 'Zoidberg',
  JobTitle: 'Doctor',
  Organization: 'Planet Express',
  Address1: 'Planet Express',
  Address2: '57th Street',
  City: 'New New York',
  StateProvince: 'NY',
  StateProvinceChoice: 'S',
  Zip: '10019',
  Country: 'US',
  Phone: '+1.5417543010',
  PhoneExt: '',
  EmailAddress: 'zoidberg@futurama.bz' }
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true" width="25"></a></p>

### `async getList(): Address[]`

Gets a list of address IDs and address names associated with the user account.

__<a name="type-address">`Address`</a>__

|       Name       |       Type       |                         Description                         |
| ---------------- | ---------------- | ----------------------------------------------------------- |
| __AddressId*__   | <em>number</em>  | A unique integer value that represents the address profile. |
| __AddressName*__ | <em>number</em>  | The name of the address profile.                            |
| __IsDefault*__   | <em>boolean</em> | Whether it is a default address.                            |

```js
/**
 * @param {NameCheap} client
 */
const GetList = async (client) => {
  const res = await client.address.getList()
  return res
}
```
```js
[ { AddressId: 0,
    AddressName: 'Primary Address',
    IsDefault: false },
  { AddressId: 101235,
    AddressName: 'Planet Express',
    IsDefault: true } ]
```







<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

<kbd><a href="/">Back To Readme</a></kbd>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>