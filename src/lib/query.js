import rqt from 'rqt'
import { stringify } from 'querystring'
import extractTags from 'rexml'
import { filterEmpty } from '.'

/** @param {string} s */
const isXml = s => s.startsWith('<?xml version="1.0" encoding="utf-8"?>')

export default async function query({
  ApiUser,
  ApiKey,
  ClientIp,
  host,
}, Command, Options = {}) {
  if (!Command) throw new Error('Command must be passed.')
  const opts = filterEmpty(Options)
  const qs = stringify({
    ApiUser,
    ApiKey,
    UserName: ApiUser,
    ClientIp,
    Command,
    ...opts,
  })
  const url = `${host}/xml.response?${qs}`
  const res = await rqt(url)
  const xml = isXml(res)
  if (!xml) throw new Error('non-xml response')

  const error = getError(res)
  if (error) throw error

  const [{ content: CommandResponse }] = extractTags('CommandResponse', res)

  return CommandResponse
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
    const er = new Error(c)
    er.props = p

    return er
  }
}