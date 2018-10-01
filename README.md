# @rqt/namecheap

[![npm version](https://badge.fury.io/js/@rqt/namecheap.svg)](https://npmjs.org/package/@rqt/namecheap)

`@rqt/namecheap` is An implementation of the namecheap.com API.

```sh
yarn add -E @rqt/namecheap
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`namecheap(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)
  * [`Config`](#type-config)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import namecheap from '@rqt/namecheap'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `namecheap(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

__<a name="type-config">`Config`</a>__: Options for the program.

|   Name    |   Type    |    Description    | Default |
| --------- | --------- | ----------------- | ------- |
| shouldRun | _boolean_ | A boolean option. | `true`  |
| __text*__ | _string_  | A text to return. | -       |

```js
/* yarn example/ */
import namecheap from '@rqt/namecheap'

(async () => {
  const res = await namecheap({
    text: 'example',
  })
  console.log(res)
})()
```
```
example
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

(c) [Rqt][1] 2018

[1]: https://rqt.biz

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>