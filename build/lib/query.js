let rqt = require('rqt'); if (rqt && rqt.__esModule) rqt = rqt.default;
const { stringify } = require('querystring');
let extractTags = require('rexml'); if (extractTags && extractTags.__esModule) extractTags = extractTags.default;
const { filterEmpty } = require('./');

/** @param {string} s */
const isXml = s => s.startsWith('<?xml version="1.0" encoding="utf-8"?>')

const UA = [
  'Mozilla/5.0',
  '(Node.js; @rqt/namecheap v2.1.2)',
  'https://github.com/rqt/namecheap',
].join(' ')

async function query({
  ApiUser,
  ApiKey,
  ClientIp,
  host,
}, Command, Options = {}, method = 'GET') {
  if (!Command) throw new Error('Command must be passed.')
  const data = filterEmpty(Options)
  const authData = {
    ApiUser,
    ApiKey,
    UserName: ApiUser,
    ClientIp,
    Command,
  }
  let res
  const headers = {
    'User-Agent': UA,
  }
  if (method == 'GET') {
    const qs = stringify({ ...authData, ...data })
    const url = `${host}/xml.response?${qs}`
    res = await rqt(url, {
      headers,
    })
  } else if (method == 'POST') {
    const qs = stringify(authData)
    res = await rqt(`${host}/xml.response?${qs}`, {
      data,
      headers,
      type: 'form',
    })
  } else {
    throw new Error('Unknown method.')
  }

  const xml = isXml(res)
  if (!xml) throw new Error('non-xml response')

  const error = getError(res)
  if (error) throw error

  const [{ content: CommandResponse }] = extractTags('CommandResponse', res)

  return CommandResponse.trim()
}

const getError = (res) => {
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

module.exports = query
module.exports.getError = getError