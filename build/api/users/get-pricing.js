let extractTags = require('rexml'); if (extractTags && extractTags.__esModule) extractTags = extractTags.default;

const COMMAND = 'namecheap.users.getPricing'

const getPricing = async (query, options) => {
  const {
    type: ProductType,
    category: ProductCategory,
    promoCode: PromotionCode,
    action: ActionName,
    product: ProductName,
  } = options
  const res = await query(COMMAND, {
    ProductType,
    ProductCategory,
    PromotionCode,
    ActionName,
    ProductName,
  })
  /** @type {!_namecheap.Pricing} */
  const productType = extractTags('ProductType', res)
    .reduce((acc, { content, props: { Name } }) => {
      const category = getCategory(content)
      acc[Name] = category
      return acc
    }, {})
  return productType
}

const getCategory = (typeContent) => {
  const category = extractTags('ProductCategory', typeContent)
    .reduce((acc, { content, props: { Name } }) => {
      const product = getProduct(content)
      acc[Name] = product
      return acc
    }, {})
  return category
}

const getProduct = (categoryContent) => {
  const product = extractTags('Product', categoryContent).reduce((acc, {
    content,
    props: { Name },
  }) => {
    const price = extractTags('Price', content)
    const prices = price.map(({ props: ppprops }) => ppprops)
    const n = Name.replace(/-(.)/g, (match, l) => l.toUpperCase())
    acc[n] = prices
    return acc
  }, {})
  return product
}

module.exports=getPricing

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').Pricing} _namecheap.Pricing
 */