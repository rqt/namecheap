import aqt from '@rqt/aqt'
import { stringify } from 'querystring'
import extractTags from 'rexml'
import { filterEmpty } from './'

/** @param {string} s */
const isXml = s => s.startsWith('<?xml version="1.0" encoding="utf-8"?>')

const UA = [
  'Mozilla/5.0',
  '(Node.JS; @rqt/namecheap v2.4.0)',
  'https://github.com/rqt/namecheap',
].join(' ')

export default async function query({
  ApiUser,
  ApiKey,
  ClientIp,
  host,
}, Command, Options = {}, method = 'GET') {
  if (!Command) throw new Error('Command must be passed.')
  const data = filterEmpty(Options)
  const authData = {
    'ApiUser': ApiUser,
    'ApiKey': ApiKey,
    'UserName': ApiUser,
    'ClientIp': ClientIp,
    'Command': Command,
  }
  let res
  const headers = {
    'User-Agent': UA,
  }
  if (method == 'GET') {
    const qs = stringify({ ...authData, ...data })
    const url = `${host}/xml.response?${qs}`
    res = await aqt(url, {
      headers,
    })
  } else if (method == 'POST') {
    const qs = stringify(authData)
    res = await aqt(`${host}/xml.response?${qs}`, {
      data,
      headers,
      type: 'form',
    })
  } else {
    throw new Error('Unknown method.')
  }
  res = res.body

  const xml = isXml(res)
  if (!xml) throw new Error('non-xml response')

  const error = getError(res)
  if (error) throw error

  const [{ content: CommandResponse }] = extractTags('CommandResponse', res)

  return CommandResponse.trim()
}

export const getError = (res) => {
  const [{ content: Errors }] = extractTags('Errors', res)
  if (Errors.length) {
    const errors = extractTags('Error', Errors)

    let c
    let p
    if (errors.length == 1) {
      const [{ content, props }] = errors
      c = content
      p = props
    } else {
      c = errors.map(({ content }) => content).join('; ')
      p = errors.map(({ props }) => props)
    }
    const er = new NamecheapError(c)
    /** @suppress {checkTypes} */
    er['props'] = p

    return er
  }
}

export class NamecheapError extends Error {}