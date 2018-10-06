```### async getPricing => Pricing
[
  ["options", "GetPricing"]
]
```

Returns pricing information for a requested product type.

%TYPEDEF types/api/users/get-pricing.xml GetPricing%

The returned object will contain data according to requested types, categories, actions and products.

%EXAMPLE: example/api/users/get-pricing.js%

%TYPEDEF types/api/users/get-pricing.xml Pricing%
All pricing info is split into 3 types: `Domain`, `SSL` and `Whois`.

%TYPEDEF types/api/users/get-pricing.xml Product%
A product consists of an array of prices.

%TYPEDEF types/api/users/get-pricing.xml Price%
A price is given for each product according to the duration of action.

%TYPEDEF types/api/users/get-pricing.xml DomainPricing%
%TYPEDEF types/api/users/get-pricing.xml SSLPricing%
%TYPEDEF types/api/users/get-pricing.xml WhoisPricing%

<details>
<summary>Show SSL Product Pricing</summary>

%TYPEDEF types/api/users/pricing/ssl.xml%
</details>

<details>
<summary>Show Whois Product Pricing</summary>

%TYPEDEF types/api/users/pricing/whois.xml%
</details>


<details>
<summary>Show COM Domain Registration Pricing Output</summary>

%FORK-json5 example example/run/users/get-pricing%
</details>

[Show SSL Purchase Pricing](https://github.com/rqt/namecheap/blob/master/ssl-pricing.md)

> When checking certificates pricing, the product names are returned in `camelCase` rather than `hyphen-case` received from NameCheap (e.g., `positivesslWildcard` instead of `positivessl-wildcard`) because some IDEs do not support JSDoc with properties containing hyphens.

<!-- %~ width="15"% -->