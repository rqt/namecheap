```### async getPricing => Pricing
[
  ["options", "GetPricing"]
]
```

Returns pricing information for a requested product type.

%TYPEDEF types/api/users/get-pricing.xml GetPricing%

The returned object will contain data according to requested types, categories, actions and products.

%TYPEDEF types/api/users/get-pricing.xml Pricing%

%EXAMPLE: example/api/users/get-pricing.js%

<details>
<summary>Show COM Domain Registration Pricing Output</summary>

%FORK-json5 example example/run/users/get-pricing%
</details>

[Show SSL Purchase Pricing](https://github.com/rqt/namecheap/blob/master/ssl-pricing.md)

> When checking certificates pricing, the product names are returned in `camelCase` rather than `hyphen-case` received from NameCheap (e.g., `positivesslWildcard` instead of `positivessl-wildcard`) because some IDEs do not support JSDoc with properties containing hyphens.

<!-- %~ width="15"% -->