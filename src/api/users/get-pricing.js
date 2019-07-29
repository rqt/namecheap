import extractTags from 'rexml'

const COMMAND = 'namecheap.users.getPricing'

/**
 * @param {?} query
 * @param {_namecheap.GetPricing} options
 */
const getPricing = async (query, options) => {
  const { type, category, promoCode, action, product } = options
  const res = await query(COMMAND, {
    'ProductType': type,
    'ProductCategory': category,
    'PromotionCode': promoCode,
    'ActionName': action,
    'ProductName': product,
  })
  const productType = /** @type {!_namecheap.Pricing} */ (extractTags('ProductType', res)
    .reduce((acc, { content, props: { 'Name': name } }) => {
      const cat = getCategory(content)
      acc[name] = cat
      return acc
    }, {}))
  return productType
}

const getCategory = (typeContent) => {
  const category = extractTags('ProductCategory', typeContent)
    .reduce((acc, { content, props: { 'Name': name } }) => {
      const product = getProduct(content)
      acc[name] = product
      return acc
    }, {})
  return category
}

const getProduct = (categoryContent) => {
  const product = extractTags('Product', categoryContent).reduce((acc, {
    content,
    props: { 'Name': name },
  }) => {
    const price = extractTags('Price', content)
    const prices = price.map(({ props: p }) => p)
    const n = name.replace(/-(.)/g, (_, l) => l.toUpperCase())
    acc[n] = prices
    return acc
  }, {})
  return product
}

export default getPricing

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/typedefs/users').Pricing} _namecheap.Pricing
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../../types/typedefs/users').GetPricing} _namecheap.GetPricing
 */
